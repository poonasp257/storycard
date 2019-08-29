import React, { Component } from 'react';
import styled from 'styled-components';
import { Timer, Like, TextBox, Icon } from 'components';
import { connect } from 'react-redux';
import { deletePostRequest } from 'modules/item'; 

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

const Button = styled.div`
    position: absolute;
    right: 0px;
    top: 0px;
    margin: 10px;
    margin-right: 25px;
`;

class Post extends Component {
    constructor(props) {
        super(props);

        const { mode, size } = props;
        
        this.ref = React.createRef();
        this.element = null;
        this.parentElement = null;
        this.originWidth = mode ? size * 2 : size;
        this.originHeight = mode ? size * 2 : size;
        this.state = {
            info: null,
            width: this.originWidth,
            height: this.originHeight,
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
            width: this.state.width * 4.0,
            height: this.state.height * 4.0,
            isOpened: true
        });
        document.addEventListener('mousedown', this.closePost);
    }

    handleDelete = () => {
        if(!window.confirm('delete this?')) return false; 
        this.props.deletePostRequest(this.state.info.get('id')).then(
            () => {
                if(this.props.status === 'SUCCESS') {

                }
                else {

                }
            }
        )
    }

    renderUI = () => {
        const { info, isOpened } = this.state;
        const id = info.get('id');
        const isWriter = this.props.username === info.get('writer');
        let ui = (
            <Interface>
                <Timer created={info.get('created')} mode={true} />
                { isWriter ? (
                    <Button onClick={this.handleDelete}>
                        <Icon type="delete_forever" size="24px"/>
                    </Button>
                ) : null }
                <TextBox text={info.get('text')} writer={info.get('writer')} postId={id}/>
                <Like likes={info.get('likes')} postId={id} mode={true}/>
            </Interface>
        );

        if (!isOpened) {
            ui = (
                <Interface>
                    <Timer created={info.get('created')} mode={false} />
                    <Like likes={info.get('likes')} postId={id} mode={false} />
                </Interface>
            );
        }

        return ui;
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {
        if(!nextProps.mode) return null;

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
            <Container id={id} className="post" ref={this.ref} onClick={this.handleClick}>
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
    size: 45,
    mode: true
};

const mapStateToProps = (state, ownProps) => {
    if (ownProps.mode === false) return { 
        isDragging: false,
        username: '',
        status: {
            edit: ''
        }
    };

    const item = state.item.getIn(['items', 'posts']).find(item => {
        return item.getIn(['info', 'id']) === ownProps.id;
    });

    return {    
        isDragging: state.drag.get('isDragging'),    
        username: state.authentication.getIn(['status', 'currentUser']),
        info: item.get('info'),
        status: {
            edit: state.item.get(['edit', 'status'])
        },
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deletePostRequest: (postId) => {
            return dispatch(deletePostRequest(postId));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);