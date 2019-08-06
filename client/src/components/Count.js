import React, { Component } from 'react';
import styled from 'styled-components';

const Content = styled.div`
    position: absolute;
    left: 50%;
    top: 80%;
    transform:translate(-50%, -80%);
`;

class Count extends Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 0,
            goal: 50
        };
    };

    render() {
        const { count, goal } = this.state;
        return (
            <Content className="white-text">
                {count} / {goal}
            </Content>
        );
    };
};

export default Count;