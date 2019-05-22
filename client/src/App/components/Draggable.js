import React, { Component } from 'react';
import styled from 'styled-components';

function usesLeftButton(e) {
    const button = e.buttons || e.which || e.button;
    return button === 1;
}

class Draggable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leftOffset: 0,
            topOffset: 0,
            left: 0,
            top: 0,
            clicked: false,
            dragging: false,
        }

        this.sourceElem = null;
        this.dragElem = null;
        this.currentTarget = null;
        this.prevTarget = null;
    }    

    componentDidMount() {
        const imgs = this.sourceElem.getElementsByTagName('IMG');
        for (let i = 0; i < imgs.length; ++i) {
          imgs[i].setAttribute('draggable', 'false');
        }

        this.addListeners(this.sourceElem);
    }

    addListeners = (element) => {
        element.addEventListener('mousedown', (e) => { this.handleMouseDown(e); });
    };



    handleMouseDown = (e) => {
        if(usesLeftButton(e))
        {
            console.log('down');            
            document.addEventListener('mousemove', this.handleMouseMove);
            document.addEventListener('mouseup', this.handleMouseUp);
            this.startDrag(e.clientX, e.clientY);
        }
    }

    startDrag = (clientX, clientY) => {
        this.dragElem = this.sourceElem.cloneNode(true);
        const rect = this.sourceElem.getBoundingClientRect();
        const fixedX = clientX - (rect.width / 2);
        const fixedY = clientY - (rect.height / 2);
        
        this.dragElem.setAttribute('style', `
            position:absolute;
            left: ${fixedX}px;
            top: ${fixedY}px;
            border: solid;
        `);
        document.body.appendChild(this.dragElem);
        this.setState({ clicked: true });
    } 

    handleMouseMove = (e) => {
        e.preventDefault();
        if (this.state.clicked) {
            this.moveDrag(e.clientX, e.clientY);
            window.getSelection().removeAllRanges();
        }
    }

    moveDrag = (x, y) => {
        this.setState({dragging: true});        
        
        
    } 

    handleMouseUp = (e) => {
        this.setState({ clicked: false });
        if (this.state.dragging) {
            document.removeEventListener('mousemove', this.handleMouseMove);
            document.removeEventListener('mouseup', this.handleMouseUp);
            this.endDrag(e.clientX, e.clientY);
            window.getSelection().removeAllRanges();
        }
    }

    endDrag = (x ,y) => {
        document.body.removeChild(this.dragElem);
    }

    render() {
        const content = this.props.children;
        return (
            <div ref={(c) => {this.sourceElem = c;}}>
                {content}                    
            </div>
        );
    }
}

Draggable.defaultProps = {
    children: null,
    onDragStart: () => {},
    onDrag: () => {},
    onDragEnd: () => {},
    onDrop: () => {},
    render: null,
    zIndex: 1000,
  };

export default Draggable;

/*

    setCurrentTarget = (x, y) => {
        const target = document.elementFromPoint(x, y) || document.body;
        this.dragElem.style.zIndex = this.props.zIndex;
        // prevent it from selecting itself as the target
        this.currentTarget = this.dragElem.contains(target) ? document.body : target;
    };

    

    drag = (x, y) => {     
        
    };

    drop = (clientX, clientY) => {
        this.setState({ dragging: false });
    }
*/