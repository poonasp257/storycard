import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as Utility from 'lib/Utility';

import { connect } from  'react-redux';
import { writePostRequest } from 'modules/post'; 
import { dragStart, dragEnd } from 'modules/drag';

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

            document.addEventListener('mousemove', this.handleMouseMove);
            document.addEventListener('mouseup', this.handleMouseUp);
            this.setState({ isDragging: true });
            this.props.dragStart();
        }
    }

    handleMouseMove = (e) => {
        if (this.state.isDragging) {
            window.getSelection().removeAllRanges();
            this.fixPositon(e.clientX, e.clientY);
        }
    }

    handleMouseUp = (e) => {
        e.preventDefault();
        window.getSelection().removeAllRanges();
        this.fixPositon(e.clientX, e.clientY);
        this.Drop(e.clientX, e.clientY);
        
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
        document.body.removeChild(this.dragElem);
        this.setState({ isDragging: false });
        this.props.dragEnd();
    }

    handlePost = (element) => {
        const { type, username } = this.props;
        const left = element.style['left'];
        const top = element.style['top'];

        return this.props.writePostRequest(type, username, left, top).then(
            () => {
                if (this.props.status === 'SUCCESS') {
                    
                }
            }
        );
    }

    handleSymbol = (postId) => {
        const { type } = this.props;
        this.props.increaseSymbol(type, postId);
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
                    switch(this.props.category) {
                        case 'post':
                            this.handlePost(this.dragElem);
                            break;
                        case 'symbol':
                            this.handleSymbol(target.id);
                            break;
                        default:
                            return false;
                    }
                    
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
    type: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired
};

const mapStateToProps = (state) => {
    return {
        username: state.authentication.getIn(['status', 'currentUser']),
        status: state.post.getIn(['write', 'status'])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        writePostRequest: (type, username, left, top) => { 
            return dispatch(writePostRequest(type, username, left, top));
        },
        dragStart: () => dispatch(dragStart()),
        dragEnd: () => dispatch(dragEnd())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Draggable);