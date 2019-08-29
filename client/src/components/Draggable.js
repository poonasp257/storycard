import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as Utility from 'lib/Utility';

import { connect } from  'react-redux';
import { attachItemRequest  } from 'modules/item'; 
import { dragStart, dragEnd } from 'modules/drag';

const Container = styled.div`
    cursor: pointer;
`;

class Draggable extends Component {
    constructor(props) {
        super(props);

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
        
    fixPositon = (x, y) => {    
        this.fixedX = x - (this.offsetX * 0.5) + window.scrollX;
        this.fixedY = y - (this.offsetY * 0.5) + window.scrollY;
        this.dragElem.setAttribute('style', `
            position: absolute;
            left: ${this.fixedX}px;
            top: ${this.fixedY}px;
            z-index: 2;
        `);
    };

    handleMouseDown = (e) => {
        if (Utility.IsLeftButton(e)) {
            this.dragElem = this.sourceElem.cloneNode(true);
            
            this.fixPositon(e.clientX, e.clientY);
            document.body.appendChild(this.dragElem);

            document.addEventListener('mousemove', this.handleMouseMove);
            document.addEventListener('mouseup', this.handleMouseUp);
            this.props.dragStart();
        }
    }

    handleMouseMove = (e) => {
        window.getSelection().removeAllRanges();
        this.fixPositon(e.clientX, e.clientY);
    }

    handleMouseUp = (e) => {
        e.preventDefault();
        window.getSelection().removeAllRanges();
        this.fixPositon(e.clientX, e.clientY);
        this.Drop(e.clientX, e.clientY);
        
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
        document.body.removeChild(this.dragElem);
        this.props.dragEnd();
    }
 
    Drop = (x, y) => {        
        const targets = [...document.getElementsByClassName(this.props.targetTag)];
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
            
            // for(let target of filteredTargets) {
            //     const items = target.getElementsByClassName('item');
            //     const itemColliders = Utility.GetRects(items);
            //     for (let itemCollider of itemColliders) {
            //         if (Utility.IsOverlap(itemCollider, collider)) return false;
            //     }
        
                if (window.confirm('Are you sure, you want to drop this?')) {
                    const { category, type, tag } = this.props;
                    const size = ((tag === 'post') ? collider.width / 2 : collider.width / 2.5); 
                    const left = parseInt(this.dragElem.style['left'], 10) 
                        - targetCollider.left - size;
                    const top = parseInt(this.dragElem.style['top'], 10) 
                        - targetCollider.top - size;
                    const info = {
                        category,
                        type,
                        left: `${left}px`,
                        top: `${top}px`
                    };

                    this.props.attachItemRequest(tag, info).then(
                        () => {
                            if (this.props.status === 'SUCCESS') {
            
                            }
                        }
                    );    
                }
            // }
        }
    }

    render() {
        return (
            <Container ref={(c) => { this.sourceElem = c; }} className="draggable">
                {this.props.children}
            </Container>
        );
    }
}

Draggable.propTypes = {
    type: PropTypes.number.isRequired,
    tag: PropTypes.string.isRequired,
    targetTag: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
    return {
        status: state.item.getIn(['attach', 'status'])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        attachItemRequest: (category, info) => { 
            return dispatch(attachItemRequest(category, info));
        },
        dragStart: () => dispatch(dragStart()),
        dragEnd: () => dispatch(dragEnd())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Draggable);