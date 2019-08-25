import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from  'react-redux';
import { editPostRequest, deletePostRequest } from 'modules/post'; 
import Icon from './Icon';

const Container = styled.div`
    position: relative;
    top: ${props => props.mode ? '35' : '0'}px;
    left: ${props => props.mode ? '30' : '0'}px;
    margin: 10px auto;
    font-family: 'Space Mono', 'Jua', sans-serif;
    font-size: 21px;
    line-height: 28px;
`;

const Text = styled.textarea`
    width: 280px;
    height: 280px;
    border: none;
    color: inherit;
    font: inherit;
    text-decoration: none;
    resize: none;
    overflow: hidden;
    background-color: transparent;
    cursor: ${props => props.cursor};
    :focus {
        outline: none;
    }
`;

const ButtonList = styled.div`
    position: absolute;
    left: 230px;
    top: 264px;
    cursor: pointer;
`; 

const Ellipsis = styled.div` 
    display: -webkit-box;
    max-width: 160px;
    height: ${20 * 3 * 1.4}px;
    margin: 0 auto;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
`;

class TextBox extends Component {
    constructor(props) {
        super(props);
        
        const lineToShow = 21;
        const lines = 9;
        this.maxLen = lineToShow * lines;

        this.state = {
            description: props.text,
            isEditMode: false
        };
    };

    handleChange = (event) => {
        let currentLen = 0; 
        let str = event.target.value; 

        for(let i = 0; i < str.length; ++i) {
            const ch = str.charCodeAt(i);

            if(ch === 10) currentLen += 21;
            else if(ch === 32) currentLen += 1.05;
            else currentLen += (ch > 127) ? 1.3125 : 1;

            if(this.maxLen + 1 <= currentLen) {
                str = str.substring(0, i);
                break;
            }
        }  

        event.target.value = str;
        this.setState({ description: str });
    }
    
    handleEdit = () => {
        const { isEditMode, description } = this.state; 

        if (isEditMode && window.confirm('Are you sure?')) {
            this.props.editPostRequest(this.props.postId, description).then(
                () => {

                }
            );
        }

        this.setState({ isEditMode: !isEditMode });
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
        const { description, isEditMode } = this.state;
        const { mode, writer, username } = this.props;
        const textbox = isEditMode ? 
            <Text defaultValue={description} onChange={this.handleChange}/>
            : <Text defaultValue={description} readOnly cursor="inherit"/>;
        const buttons = (writer === username) ? (
                <ButtonList>
                    <Icon type={isEditMode ? 'check' : 'edit'} onClick={this.handleEdit}/> 
                    <Icon type="delete_forever" onClick={this.handleDelete}/>
                </ButtonList>
            ) : null;         
        const activated = (
            <Container mode>
                {textbox}
                {buttons}
            </Container>
        );
        const deactivated = (
            <Container>
                <Ellipsis>
                    {description}
                </Ellipsis>
            </Container>
        );

        return mode ? activated : deactivated;
    };
};

const mapStateToProps = (state) => {
    return {
        username: state.authentication.getIn(['status', 'currentUser']),
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