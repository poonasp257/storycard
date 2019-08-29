import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from  'react-redux';
import { editPostRequest } from 'modules/item'; 

const Container = styled.div`
    position: relative;
    top: 35px;
    left: 30px;
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

class TextBox extends Component {
    constructor(props) {
        super(props);
        
        const lineToShow = 21;
        const lines = 9;
        this.maxLen = lineToShow * lines;

        this.prevText = props.text;
        this.state = {
            description: props.text
        };
    };

    handleEdit = () => {
        if(this.prevText === this.state.description) return;

        if (window.confirm('Are you sure?')) {
            this.props.editPostRequest(this.props.postId, this.state.description).then(
                () => {

                }
            );
        }
        this.prevText = this.state.description;
    }

    handleOnChange = (event) => {
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
    
    handleOnFocusIn = (event) => {
        this.prevText = event.target.value;
    }

    handleOnFocusOut = (event) => {
        this.handleEdit();
    }

    componentWillUnmount() {
        this.handleEdit();
    }

    render() {
        const { description } = this.state;
        const { writer, username } = this.props;
        const textbox = writer === username ? 
            <Text defaultValue={description} onChange={this.handleOnChange} 
                onFocus={this.handleOnFocusIn} onBlur={this.handleOnFocusOut}/>
            : <Text defaultValue={description} readOnly cursor="inherit"/>;

        return (
            <Container>
                {textbox}
            </Container>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        username: state.authentication.getIn(['status', 'currentUser']),
        status: {
            edit: state.item.get(['edit', 'status'])
        } 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editPostRequest: (postId, text) => {
            return dispatch(editPostRequest(postId, text));
        }
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(TextBox);