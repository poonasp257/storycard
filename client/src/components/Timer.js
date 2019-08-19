import React, { Component } from 'react';
import styled from 'styled-components';
import { Pad } from 'lib/Utility';

const MSEC = 1000;
const SEC =  MSEC * 60;
const MINUTE = SEC * 60;
const HOUR = MINUTE * 24;

const opened = `
    left: 20px; 
    top: 280px;
`;

const notOpened = `
    left: 40px;
    top: 50px;
`;

const Container = styled.div`
    position: absolute;
    ${props => props.mode ? opened : notOpened}
    font-family: 'Space Mono', monospace;
    font-size: 20px;
    font-weight: bold;
`;

class Timer extends Component {    
    constructor(props) {
        super(props);

        this.timerID = null;

        const remainTime = HOUR - (Date.now() - Date.parse(props.created));

        this.state = {
            remainTime: remainTime,
            hour: Math.floor((remainTime % HOUR) / MINUTE),
            minute: Math.floor((remainTime % MINUTE) / SEC),
            second: Math.floor((remainTime % SEC) / MSEC)
        };
    };
    
    ElipsedTime = () => {
        if(this.state.remainTime <= 0) { 
            clearTimeout(this.timerID);
            return;
        }
        const remainTime = this.state.remainTime - 1000;

        this.setState({
            remainTime: remainTime,
            hour: Math.floor((remainTime % HOUR) / MINUTE),
            minute: Math.floor((remainTime % MINUTE) / SEC),
            second: Math.floor((remainTime % SEC) / MSEC)
        });
    }

    componentDidMount() {        
        this.timerID = setInterval(this.ElipsedTime, MSEC);
    }    

    componentWillUnmount() {
        clearTimeout(this.timerID);
    }

    render() {
        const { hour, minute, second } = this.state;

        return (
            <Container mode={this.props.mode}>
                {Pad(hour, 2)}:{Pad(minute, 2)}:{Pad(second, 2)}
            </Container>
        );
    };
};

export default Timer;