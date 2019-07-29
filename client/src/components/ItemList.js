import React from 'react';
import styled from 'styled-components';
import ImageLoader from 'lib/ImageLoader';
import { Draggable } from 'components';

const Category = styled.h3`
    text-align: left;
`;

const Container = styled.div`
    float: left; 
`;

const List = styled.div`
    width: ${window.screen.width * 0.3}px;
    height: 280px;
    border: 1px solid;
`;

const Content = styled.div`
    float: left;
    margin: 10px;
`;

function ItemList({ category, Item, targetTag }) {
    let items = [];
    const images = ImageLoader(category);
    for(let image of images) {
        items.push(
            <Content key={items.length}>
                <Draggable tag={targetTag}>
                    <Item image={image} mode={false}/>
                </Draggable>
            </Content>
        );
    }

    return (
        <Container>
            <Category>{category}</Category>
            <List>
                {items}
            </List>
        </Container>
    );
};

export default ItemList;