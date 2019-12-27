import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    margin: 25% auto;
    width: 25%;
    padding: 30px 25px 5px 25px;
    border-radius: 10px;
    background-color: #f5c620;
    text-align: left;
    color: #fefae7;
    font-family: 'Jua', sans-serif;
`;

const Title = styled.div`
    margin-bottom: 20px;
    font-size: 22px;
    font-weight: bold;
`;

const Message = styled.div`
    font-size: 20px;
    font-weight: normal;
`;

const ButtonContainer = styled.div`
    font-size: 20px;
    text-align: center;
    margin: 20px auto;
`;

const Button = styled.div`
    padding: 5px 20px 5px 20px;
    margin: 15px;
    border-radius: 3px;
    display: inline-block;
    cursor: pointer;
    color: #fefae7;
    background-color: #e83c18;
    :hover {
        background-color: #fefae7;
        color: #e83c18;
    }
`;

class Alert extends Component {
    componentDidMount() {
        document.body.addEventListener("keydown", this.close);
    }

    close = (event) => {
        if(event.keyCode !== 27 && event.keyCode !== 13) return;

        this.props.closePopup();
    }

    render() {
        const { title, message } = this.props;

        return (
            <Container>
                <Title>{title}</Title>
                <Message>{message}</Message>
                <ButtonContainer>
                   <Button onClick={this.props.closePopup}>OK</Button>
                </ButtonContainer>
            </Container>
        );
    }
}

class Confirm extends Component {
    componentDidMount() { 
        document.body.addEventListener("keydown", this.OnKeyEvent);
    }

    OnKeyEvent = (event) => {
        if(event.keyCode === 13) this.OnConfirm();
        else if(event.keyCode === 27) this.props.closePopup();
    }

    OnConfirm = () => {
        this.props.onConfirm();
        this.props.closePopup();
    }

    render() {
        const { title, message } = this.props;

        return (
            <Container>
                <Title>{title}</Title>
                <Message>{message}</Message>
                <ButtonContainer>
                    <Button onClick={this.OnConfirm}>OK</Button>
                    <Button onClick={this.props.closePopup}>Cancel</Button>
                </ButtonContainer>
            </Container>
        );
    }
}

export { Alert, Confirm }