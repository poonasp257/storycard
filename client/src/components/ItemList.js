import React from 'react';
import styled from 'styled-components';
import ImageLoader from 'lib/ImageLoader';
import { Draggable } from 'components';

const Category = styled.div`
    text-align: left;
    font-size: 3em;
`;

const Container = styled.div``;

const Content = styled.div`
    float: left;
    margin: 10px;
`;

function ItemList({ category, Item, tag, targetTag }) {
    let items = [];
    const images = ImageLoader(category);

    for(let i = 0; i < images.length; ++i) {
        items.push(
            <Content key={items.length}>
                <Draggable type={i} tag={tag} targetTag={targetTag}>
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