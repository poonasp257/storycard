import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as Utility from 'lib/Utility';

import { connect } from  'react-redux';
import { addItem } from 'actions/itemManager'; 

const Main = styled.div`
    display: inline-block;
    cursor: pointer;
`;

class Draggable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDragging: false,
        }

        this.sourceElem = null;
        this.dragElem = null;
        this.fixedX = 0;
        this.fixedY = 0;
        this.offsetX = 0;
        this.offsetY = 0;
    }   

    componentDidMount() {
        const nodes = this.sourceElem.childNodes;
        for (let i = 0; i < nodes.length; ++i) {
            nodes[i].setAttribute('draggable', 'false');
        }

        const rect = this.sourceElem.getBoundingClientRect();
        this.offsetX = rect.width;
        this.offsetY = rect.height;
        
        this.sourceElem.addEventListener('mousedown', (e) => { this.handleMouseDown(e); });
    }
    
    CloneChildren(element) {
        const Container = styled.div`${element.getAttribute('style')}`;
        const cloneElem = React.cloneElement(this.props.children, { mode: true })
        const number = this.props.items.length;
        return (    
            <Container className="item" key={number} id={number}>
                {cloneElem}
            </Container>
        );
    }

    fixPositon = (x, y) => {    
        this.fixedX = x - (this.offsetX * 0.5) + window.scrollX;
        this.fixedY = y - (this.offsetY * 0.5) + window.scrollY;
        this.dragElem.setAttribute('style', `
            position: absolute;
            left: ${this.fixedX}px;
            top: ${this.fixedY}px;
        `);
    };

    handleMouseDown = (e) => {
        if (Utility.IsLeftButton(e)) {
            this.dragElem = this.sourceElem.cloneNode(true);
            
            this.fixPositon(e.clientX, e.clientY);
            document.body.appendChild(this.dragElem);
            this.props.OnDragStart(e);

            document.addEventListener('mousemove', this.handleMouseMove);
            document.addEventListener('mouseup', this.handleMouseUp);
            this.setState({ isDragging: true });
        }
    }

    handleMouseMove = (e) => {
        if (this.state.isDragging) {
            window.getSelection().removeAllRanges();
            this.fixPositon(e.clientX, e.clientY);
            this.props.OnDrag(e);
        }
    }

    handleMouseUp = (e) => {
        e.preventDefault();
        window.getSelection().removeAllRanges();
        this.fixPositon(e.clientX, e.clientY);
        this.Drop(e.clientX, e.clientY);
        this.props.OnDragEnd(e);
        
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
        document.body.removeChild(this.dragElem);
        this.setState({ isDragging: false });
    }

    Drop = (x, y) => {        
        const targets = [...document.getElementsByClassName(this.props.tag)];
        const filteredTargets = targets.filter(
            (target) => {
                let parentClass = target.parentNode.className;
                return parentClass.search('draggable') < 0 ? true : false;
            }
        );        
        const targetColliders = Utility.GetRects(filteredTargets);
        const collider = this.dragElem.getBoundingClientRect();

        for(let targetCollider of targetColliders) {
            if (!Utility.IsContaining(targetCollider, collider)) continue;
        
            for(let target of filteredTargets) {
                const items = target.getElementsByClassName('item');
                const itemColliders = Utility.GetRects(items);
                for (let itemCollider of itemColliders) {
                    if (Utility.IsOverlap(itemCollider, collider)) return false;
                }
        
                if (window.confirm('Are you sure, you want to drop this?')) {
                    let cloneElem = this.CloneChildren(this.dragElem);
                    this.props.addItem(cloneElem);
                    return true;
                }
            }
        }
        
        return false;
    }

    render() {
        return (
            <Main ref={(c) => { this.sourceElem = c; }} className="draggable">
                {this.props.children}
            </Main>
        );
    }
}

Draggable.propTypes = {
    tag: PropTypes.string.isRequired
};

Draggable.defaultProps = {
    OnDragStart: () => {},
    OnDrag: () => {},
    OnDragEnd: () => {}
};

const mapStateToProps = (state) => {
    return {
        items: state.itemManager.items
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItem: (item) => {
            dispatch(addItem(item));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Draggable);