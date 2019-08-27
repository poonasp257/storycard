import React, { Component } from 'react';
import styled from 'styled-components';
import { Timer, Like, TextBox, Icon } from 'components';
import { connect } from 'react-redux';

const Container = styled.div`
    cursor: pointer;
    display: inline-block; 
    color: #fefae7;
`;

const Background = styled.img`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
`;

const Interface = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
`;

const Zoom = styled.div`
    position: absolute;
    left: 312px;
    top: 309px;
`;

class Post extends Component {
    constructor(props) {
        super(props);

        this.ref = React.createRef();
        this.element = null;
        this.parentElement = null;
        this.originWidth = props.mode ? 180 : 45;
        this.originHeight = props.mode ? 180 : 45;

        this.state = {
            info: null,
            width: this.originWidth,
            height: this.originHeight,
            isHover: false,
            isOpened: false
        };
    }

    closePost = (event) => {
        if (this.element.contains(event.target)) return false;

        this.parentElement.setAttribute('style', 'z-index: 0;');
        this.element.setAttribute('style', 'cursor: pointer;');
        this.setState({
            width: this.originWidth,
            height: this.originHeight,
            isOpened: false
        });
        document.removeEventListener('mousedown', this.closePost);
    }

    handleClick = (event) => {
        if (this.state.isOpened) return false;

        this.parentElement.setAttribute('style', 'z-index: 1;');
        this.element.setAttribute('style', 'cursor: default;');
        this.setState({
            width: this.state.width * 2.0,
            height: this.state.height * 2.0,
            isOpened: true
        });
        document.addEventListener('mousedown', this.closePost);
    }

    handleMouseEnter = (event) => {
        if (this.props.isDragging || this.state.isOpened) return false;

        this.setState({ isHover: true });
    }

    handleMouseLeave = (event) => {
        if (this.props.isDragging || this.state.isOpened) return false;

        this.setState({ isHover: false });
    }

    renderUI = () => {
        //console.log('and render UI');

        const { info, isHover, isOpened } = this.state;
        const id = info.get('id');
        let ui = (
            <Interface>
                <Timer created={info.get('created')} mode={true} />
                <TextBox text={info.get('text')} writer={info.get('writer')} postId={id} mode={true} />
                <Like likes={info.get('likes')} postId={id} mode={true} />
                <Zoom onClick={() => window.location.href = `/main/${id}`}><Icon type="search" size="20px" /></Zoom>
            </Interface>
        );

        if (!isOpened) {
            if (isHover) {
                ui = (
                    <Interface>
                        <Timer created={info.get('created')} mode={false} />
                        <Like likes={info.get('likes')} postId={id} mode={false} />
                    </Interface>
                );
            }
            else {
                ui = (
                    <Interface>
                        <TextBox text={info.get('text')} postId={id} mode={false} />
                    </Interface>
                );
            }
        }

        return ui;
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {
        if(!nextProps.mode) return null;

        //console.log('post comp, get new props...', nextProps.info);
        
        return { info: nextProps.info };
    }

    componentDidMount() {        
        if(!this.props.mode) return;

        this.element = this.ref.current;
        this.parentElement = this.element.parentElement;
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.closePost);
    }

    render() {
        const { id, resource, mode } = this.props;
        const { width, height } = this.state;
        const background = (
            <Background width={width} height={height} src={resource} draggable="false"/>
        );
        const deactivated = (
            <Container>
                {background}
            </Container>
        );
        const activated = (
            <Container id={id} className="post" ref={this.ref} onClick={this.handleClick}
                onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                {background}
                {mode ? this.renderUI() : null}
            </Container>
        );

        return mode ? activated : deactivated;
    }
}

Post.defaultProps = {
    id: '',
    resource: '#fefae7',
    mode: true
};

const mapStateToProps = (state, ownProps) => {
    if (ownProps.mode === false) return { isDragging: state.drag.get('isDragging') };

    const item = state.post.get('items').find(item => {
        return item.getIn(['info', 'id']) === ownProps.id;
    });

    return {
        isDragging: state.drag.get('isDragging'),
        info: item.get('info')
    };
};

export default connect(mapStateToProps, null)(Post);