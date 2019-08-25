import React from 'react';
import styled from 'styled-components';
import ResourceLoader from 'lib/ResourceLoader';
import { Draggable } from 'components';

import ReactSVG from 'react-svg';

const Container = styled.div`
    position: relative;
    margin: 20px auto;
`;

const Background = styled(ReactSVG)`
    width: 350px;
`;

const Category = styled.span`
    position: absolute;
    left: 25px;
    top: 5px;
    color: #fefae7;
    font-size: 21px; 
    font-family: 'Do Hyeon', sans-serif;
`;

const List = styled.div`
    position: absolute;
    left: 0px;
    top: 30px;
    width: 350px;
    margin: 10px;
`;

const ItemContainer = styled.div`
    float: left;
    margin: 10px;
`;

const LAGNGUAGE = {
    'conflict': '갈등',
    'resolution': '해결',
    'post': '직접입력'
};

function ItemList({ bg, category, Item, tag, targetTag }) {
    let items = [];
    const resources = ResourceLoader(category);

    for(let i = 0; i < resources.length; ++i) {
        items.push(
            <ItemContainer key={items.length}>
                <Draggable category={category} type={i} tag={tag} targetTag={targetTag}>
                    <Item resource={resources[i]} mode={false}/>
                </Draggable>
            </ItemContainer>
        );
    }

    let translatedCategory = LAGNGUAGE[category];
    return (
        <Container>
            <Background src={bg}/>
            <Category>{translatedCategory}</Category>
            <List>{items}</List>
        </Container>
    );
};

export default ItemList;