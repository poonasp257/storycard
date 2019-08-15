import React, { Component } from 'react';
import styled from 'styled-components';
import LinesEllipsis from 'react-lines-ellipsis';
import Icon from './Icon';

import { connect } from  'react-redux';
import { editPostRequest, deletePostRequest } from 'modules/post';

const Content = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;    
    transform:translate(-50%, -50%);
`;

const Text = styled.textarea`
    width: 200px;
    height: 200px;
    resize: none;
    font-size: 1.5em;
    border: 1px solid;
    cursor: ${props => props.cursor};
    :focus {
        outline: none;
    }
`;

class TextBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            description: props.text,
            isEditMode: false
        };
    };

    handleChange = (event) => {
        this.setState({
            description: event.target.value
        });
    }
    
    handleEdit = () => {
        const { isEditMode, description } = this.state;
        const { postId, username } = this.props;
        if(isEditMode) {
            if(window.confirm('Are you sure, you want to edit this post')) {
                this.props.editPostRequest(postId, username, description).then(
                    () => {

                    }
                );
            }
        }

        this.setState({
            isEditMode: !this.state.isEditMode
        });
    }

    handleDelete = () => {
        if(!window.confirm('delete this?')) return false;

        const { postId, username } = this.props;
        
        this.props.deletePostRequest(postId, username).then(
            () => {
                if(this.props.status === 'SUCCESS') {

                }
                else {



                }
            }
        )
    }

    render() {
        const { mode } = this.props;
        const { description, isEditMode } = this.state;
        const editIcon = isEditMode ? 'check' : 'edit';
        const editMode = isEditMode ? 
            <Text defaultValue={description} onChange={this.handleChange}/>
            : <Text defaultValue={description} readOnly cursor="inherit"/>;
            
        const viewMode = mode ?
            <div>
                {editMode}
                <Icon type={editIcon} onClick={this.handleEdit}/>
                <Icon type="delete" onClick={this.handleDelete}/>
            </div>
            : <LinesEllipsis text={description} maxLine='6' 
                ellipsis='...' basedOn='letters'/>;

        return (
            <Content onContextMenu="return false" onDragStart="return false" onSelectStart="return false">
                {viewMode}
            </Content>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        username: state.authentication.getIn(['status', 'currentUser']),
        status: state.post.get(['delete', 'status'])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editPostRequest: (postId, username, text) => {
            return dispatch(editPostRequest(postId,username, text));
        },
        deletePostRequest: (postId, username) => {
            return dispatch(deletePostRequest(postId, username));
        }
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(TextBox);