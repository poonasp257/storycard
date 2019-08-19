import React, { Component } from 'react';
import styled from 'styled-components';
import LinesEllipsis from 'react-lines-ellipsis';
import { connect } from  'react-redux';
import { editPostRequest, deletePostRequest } from 'modules/post'; 

const Container = styled.div`
    margin: 15px;
    font-family: 'Space Mono', 'Jua', sans-serif;
    font-size: 20px;
`;

const Text = styled.textarea`
    width: 330px;
    height: 280px;
    resize: none;
    text-decoration: none;
    cursor: ${props => props.cursor};
    border: none;
    font: inherit;
    color: inherit;
    background-color: transparent;
    max-length: 195;
    :focus {
        outline: none;
    }
`;

const ButtonList = styled.div`
    postion: absolute;
    right: 0px;
    top: 0px;
    cursor: pointer;
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
        
        if(isEditMode) {
            if(window.confirm('Are you sure?')) {
                this.props.editPostRequest(this.props.postId, description).then(
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

        this.props.deletePostRequest(this.props.postId).then(
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
        const editIcon = isEditMode ? 'submit' : 'edit';
        const editMode = isEditMode ? 
            <Text defaultValue={description} onChange={this.handleChange}/>
            : <Text defaultValue={description} readOnly cursor="inherit"/>;
            
        const viewMode = mode ?
            <div>
                {editMode}
                <ButtonList>
                    <div onClick={this.handleEdit}>{editIcon}</div> 
                    <div onClick={this.handleDelete}>delete</div>
                </ButtonList>
            </div>
            : <LinesEllipsis text={description} maxLine='6' 
                ellipsis='...' basedOn='letters'/>;

        return (
            <Container>
                {viewMode}
            </Container>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        status: {
            edit: state.post.get(['edit', 'status']),
            delete: state.post.get(['delete', 'status'])
        } 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editPostRequest: (postId, text) => {
            return dispatch(editPostRequest(postId, text));
        },
        deletePostRequest: (postId) => {
            return dispatch(deletePostRequest(postId));
        }
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(TextBox);