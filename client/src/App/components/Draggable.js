import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { objectTypeSpreadProperty } from '@babel/types';

function usesLeftButton(e) {
    const button = e.buttons || e.which || e.button;
    return button === 1;
}

class Draggable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
            dragging: false,
        }

        this.sourceElem = null;
        this.dragElem = null;
        this.fixedX = 0;
        this.fixedY = 0;
        this.offsetX = 0;
        this.offsetY = 0;
    }

    componentDidMount() {
        const imgs = this.sourceElem.getElementsByTagName('IMG');
        for (let i = 0; i < imgs.length; ++i) {
            imgs[i].setAttribute('draggable', 'false');
        }

        const rect = this.sourceElem.getBoundingClientRect();
        this.offsetX = rect.width;
        this.offsetY = rect.height;
        this.addListeners(this.sourceElem);
    }

    fixPositon = (x, y) => {
        this.fixedX = x - (this.offsetX * 0.5);
        this.fixedY = y - (this.offsetY * 0.5);

        this.dragElem.setAttribute('style', `
        position:absolute;
        left: ${this.fixedX}px;
        top: ${this.fixedY}px;
        `);
    };

    GetTarget = (tag) => {
        const targets = document.getElementsByClassName(tag);
        return (
            Object.keys(targets).map((key) => {
                const width = parseInt(targets[key].style["width"]);
                const height = parseInt(targets[key].style["height"]);
                const left = parseInt(targets[key].style["left"]);
                const top = parseInt(targets[key].style["top"]);
                const right = parseInt(left) + width;
                const bottom = parseInt(top) + height;

                return ({
                    width: width,
                    height: height,
                    left: left,
                    top: top,
                    right: right,
                    bottom: bottom,
                });
            })
        );
    }

    Overlap = (lhs, rhs) => {
        return !(
            lhs.top > rhs.bottom || lhs.right < rhs.left ||
            lhs.bottom < rhs.top || lhs.left > rhs.right
        );
    }

    IsContaining = (lhs, rhs) => {
        return (
            lhs.left <= rhs.left &&
            rhs.left <= lhs.left + lhs.width - rhs.width &&
            lhs.top <= rhs.top &&
            rhs.top <= lhs.top + lhs.height - rhs.height
        );
    }

    addListeners = (element) => {
        element.addEventListener('mousedown', (e) => { this.handleMouseDown(e); }, false);
    };

    handleMouseDown = (e) => {
        if (usesLeftButton(e)) {
            document.addEventListener('mousemove', this.handleMouseMove);
            document.addEventListener('mouseup', this.handleMouseUp);
            this.startDrag(e.clientX, e.clientY);
        }
    }

    startDrag = (x, y) => {
        this.dragElem = this.sourceElem.cloneNode(true);
        this.fixPositon(x, y);

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
        this.fixPositon(x, y);
        this.setState({ dragging: true });
    }

    handleMouseUp = (e) => {
        e.preventDefault();
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
        window.getSelection().removeAllRanges();
        this.endDrag(e.clientX, e.clientY);
    }

    endDrag = (x, y) => {
        this.fixPositon(x, y);

        const targets = this.GetTarget(this.props.tag);
        const dragRect = {
            width: this.offsetX,
            height: this.offsetY,
            left: this.fixedX,
            top: this.fixedY,
            right: this.fixedX + this.offsetX,
            bottom: this.fixedY + this.offsetY
        };

        Object.keys(targets).map((key) => {
            if (this.IsContaining(targets[key], dragRect)) {
                this.props.setContainer(this.dragElem);
            }
            if (this.Overlap(targets[key], dragRect)) {
                console.log('overlap')
            }
        })

        document.body.removeChild(this.dragElem);
        this.setState({
            clicked: false,
            dragging: false
        });
    }

    render() {
        const content = this.props.children;

        return (
            <div ref={(c) => { this.sourceElem = c; }}>
                {content}
            </div>
        );
    }
}

Draggable.propTypes = {
    tag: PropTypes.string.isRequired
}

Draggable.defaultProps = {
    children: null,
    onDragStart: () => { },
    onDrag: () => { },
    onDragEnd: () => { },
    onDrop: () => { },
    render: null,
    zIndex: 1000,
};

export default Draggable;