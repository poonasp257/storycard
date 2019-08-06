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
    border: 2px solid;
`;

const Content = styled.div`
    float: left;
    margin: 10px;
`;

function ItemList({ category, Item, targetTag }) {
    let items = [];
    const images = ImageLoader(category);
    
    for(let i = 0; i < images.length; ++i) {
        items.push(
            <Content key={items.length}>
                <Draggable 
                    type={i}
                    category={category} 
                    tag={targetTag}>
                        <Item image={images[i]} mode={false}/>
                </Draggable>
            </Content>
        );
    }

    return (
        <Container>
            <Category>{category.toUpperCase()}</Category>
            <List>
                {items}
            </List>
        </Container>
    );
};

export default ItemList;