import React, { Component } from 'react'; 
import styled from 'styled-components';
import { Icon } from 'components';

const Content = styled.div`
    position: fixed;
    top: 0px;
    width: 100%;
`;

class Menu extends Component {
    render() {
        return (
            <Content>
                <Icon type="menu" size="40"/>
            </Content>
        );
    };
};

export default Menu;