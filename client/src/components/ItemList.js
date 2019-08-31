import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ResourceLoader from 'lib/ResourceLoader';
import { Draggable } from 'components';

const Container = styled.div`
    margin: 20px 20px 20px 0px;
`;

const Category = styled.div`
    width: fit-content;
    padding: 5px 25px 2px 25px;
    border-radius: 15px 15px 0px 0px;
    color: #fefae7;
    background-color: #e83c18;
    font-size: 21px; 
    font-family: 'Do Hyeon', sans-serif;
`;

const Content = styled.div` 
    width: 350px;
    margin: 0 auto;
    border-radius: 0px 30px 0px 30px; 
    background-color: #fefae7;
`;

const List = styled.div`
    text-align: center;
`;

const ItemContainer = styled.div`
    display: inline-block;
    margin: 10px;
`;

const LAGNGUAGE = {
    'conflict': '갈등',
    'resolution': '해결',
    'post': '직접입력'
};

function ItemList({ bg, category, Item, tag, targetTag, size }) {
    const resources = ResourceLoader(category);
    let items = [];

    for(let i = 0; i < resources.length; ++i) {
        items.push(
            <ItemContainer key={items.length}>
                <Draggable category={category} type={i} tag={tag} targetTag={targetTag}>
                    <Item resource={resources[i]} size={size} mode={false}/>
                </Draggable>
            </ItemContainer>
        );
    }

    let translatedCategory = LAGNGUAGE[category];
    return (
        <Container>
            <Category>{translatedCategory}</Category>
            <Content>
                <List>{items}</List>
            </Content>
        </Container>
    );
};

ItemList.propTypes = {
    bg: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    targetTag: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    itemSpacing: PropTypes.number.isRequired,
};

export default ItemList;