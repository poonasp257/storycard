import React, { Component } from 'react';
import styled from 'styled-components';
import { Pad } from 'lib/Utility';

const MSEC = 1000;
const SEC =  MSEC * 60;
const MINUTE = SEC * 60;
const HOUR = MINUTE * 24;

const containerStyle = {
    activated: `
        margin: 10px;
        font-size: 20px;
    `,
    deactivated: `
        top: 20%;
        font-size: 13px;
    `
};

const Container = styled.div`
    position: absolute;
    left: 50%;
    transform: translate(-55%, 0);
    ${props => props.mode ? containerStyle.activated : containerStyle.deactivated}
    font-weight: bold;
    font-family: 'Space Mono', monospace;
`;

class Timer extends Component {    
    constructor(props) {
        super(props); 
        
        this.timerID = null;

        let remainTime = HOUR - (Date.now() - Date.parse(props.created));
        if(remainTime < 0) remainTime = 0;
        this.state = {
            remainTime: remainTime,
            hour: Math.floor((remainTime % HOUR) / MINUTE),
            minute: Math.floor((remainTime % MINUTE) / SEC),
            second: Math.floor((remainTime % SEC) / MSEC)
        };
    };

    SetTimer = (remainTime) => {
        if(remainTime < 0) remainTime = 0;

        this.setState({
            remainTime: remainTime,
            hour: Math.floor((remainTime % HOUR) / MINUTE),
            minute: Math.floor((remainTime % MINUTE) / SEC),
            second: Math.floor((remainTime % SEC) / MSEC)
        });
    }
    
    ElipsedTime = () => {       
        const remainTime = this.state.remainTime - 1000;
        this.SetTimer(remainTime);

        if(this.state.remainTime <= 0) { 
            clearTimeout(this.timerID);
        }
    }

    componentDidMount() {        
        this.timerID = setInterval(this.ElipsedTime, MSEC);
    }    

    componentWillUnmount() {
        clearTimeout(this.timerID);
    }

    render() {
        const { remainTime, hour, minute, second } = this.state;
        
        return (
            <Container mode={this.props.mode}>
                {remainTime === 0 ? "TIMEOUT" : `${Pad(hour, 2)}:${Pad(minute, 2)}:${Pad(second, 2)}`}
            </Container>
        );
    };
};

export default Timer;