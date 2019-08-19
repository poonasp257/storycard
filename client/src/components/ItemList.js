import React from 'react';
import styled from 'styled-components';
import ResourceLoader from 'lib/ResourceLoader';
import { Draggable } from 'components';
 
const Container = styled.div`  
    display: inline-block;
`;

const Content = styled.div`
    float: left;
    margin: 10px;
`;

function ItemList({ category, Item, tag, targetTag }) {
    let items = [];
    const resources = ResourceLoader(category);

    for(let i = 0; i < resources.length; ++i) {
        items.push(
            <Content key={items.length}>
                <Draggable category={category} type={i} tag={tag} targetTag={targetTag}>
                    <Item resource={resources[i]} mode={false}/>
                </Draggable>
            </Content>
        );
    }

    return (
        <Container>
            {items}
        </Container>
    );
};

export default ItemList;