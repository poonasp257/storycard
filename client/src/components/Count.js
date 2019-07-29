import React, { Component } from 'react';
import styled from 'styled-components';

const Content = styled.div`
    position: absolute;
    right: 0px;
    bottom: 0px;
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
            <Content>
                {count} / {goal}
            </Content>
        );
    };
};

export default Count;