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
            offsetX: 0,
            offsetY: 0,
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

        const rect = this.sourceElem.getBoundingClientRect();
        this.setState({
            offsetX: rect.width / 2,
            offsetY: rect.height / 2
        });

        this.addListeners(this.sourceElem);
    }

    addListeners = (element) => {
        element.addEventListener('mousedown', (e) => { this.handleMouseDown(e); }, false);
    };
    
    handleMouseDown = (e) => {
        if(usesLeftButton(e))
        {
            console.log('down');            
            this.dragElem = this.sourceElem.cloneNode(true);
            document.addEventListener('mousemove', this.handleMouseMove);
            document.addEventListener('mouseup', this.handleMouseUp);
            this.startDrag(e.clientX, e.clientY);
        }
    }

    startDrag = (x, y) => {
        const fixedX = x - this.state.offsetX;
        const fixedY = y - this.state.offsetY;
        
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
        if (this.state.clicked) {
            console.log('move');
            window.getSelection().removeAllRanges();
            this.moveDrag(e.clientX, e.clientY);
        }
    }

    moveDrag = (x, y) => {
        const fixedX = x - this.state.offsetX;
        const fixedY = y - this.state.offsetY;

        this.dragElem.style.left = fixedX;
        this.dragElem.style.top = fixedY;
        
        this.setState({dragging: true});        
    } 

    handleMouseUp = (e) => {
        if (this.state.dragging) {
            console.log('up');

            e.preventDefault();
            document.removeEventListener('mousemove', this.handleMouseMove);
            document.removeEventListener('mouseup', this.handleMouseUp);
            window.getSelection().removeAllRanges();
            this.endDrag(e.clientX, e.clientY);
        }
    }

    endDrag = (x ,y) => {
        const fixedX = x - this.state.offsetX;
        const fixedY = y - this.state.offsetY;

        this.dragElem.style.left = fixedX;
        this.dragElem.style.top = fixedY;
        
        document.body.removeChild(this.dragElem);
        this.setState({ 
            clicked: false,
            dragging: false 
        });
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