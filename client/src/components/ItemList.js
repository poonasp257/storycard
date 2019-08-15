import React from 'react';
import styled from 'styled-components';
import ImageLoader from 'lib/ImageLoader';
import { Draggable } from 'components';

const Category = styled.div`
    text-align: left;
    font-size: 3em;
`;

const Container = styled.div`
    width: ${window.screen.width * 0.15}px;
    height: ${window.screen.height * 0.8}px;
    margin: 15px;
    padding: 15px;
    border: 2px solid;
    background-color: white;
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
            {items}
        </Container>
    );
};

export default ItemList;