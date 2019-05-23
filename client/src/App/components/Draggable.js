import React, { Component } from 'react';

function usesLeftButton(e) {
    const button = e.buttons || e.which || e.button;
    return button === 1;
}

function getFixedOffset() {
    // When browser window is zoomed, IOS browsers will offset "location:fixed" component coordinates
    // from the actual window coordinates
    let fixedElem = document.createElement('div');
    fixedElem.style.cssText = 'position:fixed; top: 0; left: 0';
    document.body.appendChild(fixedElem);
    const rect = fixedElem.getBoundingClientRect();
    document.body.removeChild(fixedElem);
    return [rect.left, rect.top];
}

function isZoomed() {
    // somewhat arbitrary figure to decide whether we need to use getFixedOffset (above) or not
    return Math.abs(1 - (document.body.clientWidth / window.innerWidth)) > 0.02;
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
    }    

    componentDidMount() {
        const imgs = this.sourceElem.getElementsByTagName('IMG');
        for (let i = 0; i < imgs.length; ++i) {
            imgs[i].setAttribute('draggable', 'false');
        }

        const rect = this.sourceElem.getBoundingClientRect();
        this.setState({
            offsetX: rect.width * 0.5,
            offsetY: rect.height * 0.5
        });

        this.addListeners(this.sourceElem);

    }

    setFixedOffset = () => {
        if (isZoomed()) {
            [this.fixedOffsetLeft, this.fixedOffsetTop] = getFixedOffset();
        }
    };

    addListeners = (element) => {
        element.addEventListener('mousedown', (e) => { this.handleMouseDown(e); }, false);
    };
    
    handleMouseDown = (e) => {
        if(usesLeftButton(e))
        {           
            document.addEventListener('mousemove', this.handleMouseMove);
            document.addEventListener('mouseup', this.handleMouseUp);
            this.startDrag(e.clientX, e.clientY);
        }
    }

    startDrag = (x, y) => {
        const fixedX = x - this.state.offsetX;
        const fixedY = y - this.state.offsetY;
        
        this.dragElem = this.sourceElem.cloneNode(true);
        this.dragElem.setAttribute('style', `
            position:absolute;
            left: ${fixedX}px;
            top: ${fixedY}px;
        `);
        
        document.body.appendChild(this.dragElem);
        this.setState({ clicked: true });
    } 

    handleMouseMove = (e) => {
        if (this.state.clicked) {
            window.getSelection().removeAllRanges();
            this.moveDrag(e.clientX, e.clientY);
        }
    }

    moveDrag = (x, y) => {
        const fixedX = x - this.state.offsetX;
        const fixedY = y - this.state.offsetY;

        this.dragElem.setAttribute('style', `
            position:absolute;
            left: ${fixedX}px;
            top: ${fixedY}px;
        `);
        console.log(this.dragElem.style.left + ' : ' + this.dragElem.style.top)
        
        this.setState({dragging: true});        
    } 

    handleMouseUp = (e) => {
            e.preventDefault();
            document.removeEventListener('mousemove', this.handleMouseMove);
            document.removeEventListener('mouseup', this.handleMouseUp);
            window.getSelection().removeAllRanges();
            this.endDrag(e.clientX, e.clientY);
    }

    endDrag = (x ,y) => {
        const fixedX = x - this.state.offsetX;
        const fixedY = y - this.state.offsetY;

        this.dragElem.setAttribute('style', `
            position:absolute;
            left: ${fixedX}px;
            top: ${fixedY}px;
        `);

        console.log(this.dragElem.style.left + ' : ' + this.dragElem.style.top)
        
        document.body.removeChild(this.dragElem);
        this.setState({ 
            clicked: false,
            dragging: false
        });
        this.props.setContainer(this.dragElem);
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