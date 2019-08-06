import React, { Component } from 'react';
import styled from 'styled-components';
import LinesEllipsis from 'react-lines-ellipsis';
import Icon from './Icon';

import { connect } from  'react-redux';
import { deletePostRequest } from 'modules/post';

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
            description: '',
            isEditMode: false
        };
    };

    handleChange = (event) => {
        this.setState({
            description: event.target.value
        });
    }
    
    handleEdit = () => {
        const { isEditMode } = this.state;
        //description, 
        if(isEditMode) {
            if(window.confirm('Are you sure, you want to edit this post')) {
            // server에 request(description)
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
        const editMode = isEditMode ? 'check' : 'edit';
        const viewMode = isEditMode ? 
            <Text defaultValue={description} onChange={this.handleChange}/>
            : <Text defaultValue={description} readonly cursor="inherit"/>;
            
        const text = mode ?
            <div>
                {viewMode}
                <Icon type={editMode} onClick={this.handleEdit}/>
                <Icon type="delete" onClick={this.handleDelete}/>
            </div>
            : <LinesEllipsis text={description} maxLine='6' 
                ellipsis='...' basedOn='letters'/>;

        return (
            <Content>
                {text}
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
        deletePostRequest: (postId, username) => {
            return dispatch(deletePostRequest(postId, username));
        }
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(TextBox);