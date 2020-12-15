import React from 'react';
import styled from 'styled-components';
import { ArrowButton } from 'components';

import background from 'resources/credit/PNG/paper01.png';
import title from 'resources/credit/PNG/title.png';

import profile01 from 'resources/credit/PNG/paper02.png';
import profile02 from 'resources/credit/PNG/paper03.png';
import profile03 from 'resources/credit/PNG/paper04.png';

import photo01 from 'resources/credit/PNG/photo01.png';
import photo02 from 'resources/credit/PNG/photo02.png';
import photo03 from 'resources/credit/PNG/photo03.png';
import photo04 from 'resources/credit/PNG/photo04.png';
import photo05 from 'resources/credit/PNG/photo05.png';

function Credit() {
    const Container = styled.div`    
        margin: 0 auto;
        text-align: center;
    `;

    const TopContent = styled.div`   
        height: ${window.screen.height / 1.8}px;
        background-image: url(${background});
        background-repeat: no-repeat;
        background-size: ${window.screen.width}px ${window.screen.height / 1.8}px;
    `;

    const BottomContent = styled.div`   
        margin: 0 auto;
    `;

    const Header = styled.div`
        height: 60px;
        padding-top: ${window.screen.height / 13}px;
    `;

    const BackButton = styled.div`
        float: left;
        margin-left: 200px;
    `; 

    const Title = styled.img`
        float: left;
        margin: 0 0 0 550px;
    `;

    const MainNameCardList = styled.div`
        margin: 5px auto;
    `;

    const NameCardList = styled.div`
        margin: 30px auto;
    `;

    return (
        <Container>
            <TopContent>
                <Header>
                    <BackButton><ArrowButton to="/" size="30px"/></BackButton>
                    <Title src={title} draggable="false"/>
                </Header>
                <MainNameCardList>
                    <MainNameCard name="Hyun-Jee Kim" rank="Assistant Professor" photo={photo01}>
                        School of Games, Game Graphic Design,<br />
                        Hongik University
                    </MainNameCard>
                    <MainNameCard name="Byung-Chull Bae" rank="Assistant Professor" photo={photo02}>
                        School of Games, Game Software,<br />
                        Hongik University
                    </MainNameCard>
                </MainNameCardList>
            </TopContent>
            <BottomContent>
                <NameCardList>
                    <NameCard bg={profile01} width={476} height={199} left="55%" top="45%" name="Lee Hye-rin" photo={photo03}>
                        Digital Media Design,<br/>
                        Hongik University
                    </NameCard>
                    <NameCard bg={profile02} width={471} height={215} left="50%" top="50%" name="Lee Jun Young" photo={photo04}>
                        Game Software,<br/>
                        Hongik University
                    </NameCard>
                    <NameCard bg={profile03} width={483} height={211} left="55%" top="45%" name="O Neul" photo={photo05}>
                        Digital Media Design,<br/>
                        Hongik University
                    </NameCard>
                </NameCardList>
            </BottomContent>
        </Container>
    );
};

function MainNameCard({ name, photo, rank, children }) {
    const Container = styled.div`
        display: inline-block;
        width: fit-content;
        height: 150px;
        margin: 50px;
        font-size: 16px;
        font-family: 'Space Mono', monospace;
        text-align: left;
    `;

    const Name = styled.div`
        width: fit-content;
        padding: 5px 20px 7px 20px;
        margin-bottom: 15px;
        border-radius: 0px 25px 0px 25px;
        background-color: #7772b4;
        color: #f5c620;
    `;

    const Photo = styled.img`
        width: 100px;
        height: 100px;
        float: left;
        margin-right: 15px;
    `;

    const Content = styled.div`
        margin-top: 10px;
        float: right;
    `;

    const Rank = styled.div`
        margin-bottom: 10px;
        color: #7772b4;
    `;

    const Description = styled.div`
        color: #7772b4;
        line-height: 26px;        
    `;

    return (
        <Container>
            <Name>{name}</Name>
            <Photo src={photo} draggable="false"/>
            <Content>
                <Rank>{rank}</Rank>
                <Description>{children}</Description>
            </Content>
        </Container>
    );
}

function NameCard({ bg, width, height, left, top, name, photo, children }) {
    const OutContainer = styled.div`
        position: relative;
        width: ${width}px;
        height: ${height}px;
        display: inline-block;
        background: url(${bg});
        background-repeat: no-repeat;
        font-family: 'Space Mono', monospace;
    `;

    const InContainer = styled.div`
        position: absolute;
        left: ${left};
        top: ${top};
        transform: translate(-${left}, -${top});
        width: fit-content;
        text-align: left;
    `;

    const Photo = styled.img`
        width: 80px;
        height: 80px;
        margin-right: 10px;
        float: left;
    `;

    const Content = styled.div`
        float: right;
    `;
    
    const Name = styled.div` 
        padding: 2px 15px 3px 15px;
        color: #7772b4;
        border-radius: 20px;
        background-color: #f5c620;
        font-size: 15px;
        width: fit-content;
        margin-bottom: 10px;
    `;
        
    const Description = styled.div`
        color: #7772b4;
        margin-left: 5px;
        font-size: 14px;
        line-height: 22px;
    `;

    return (
        <OutContainer>
            <InContainer>
                <Photo src={photo} draggable="false"/>
                <Content>
                    <Name>{name}</Name>
                    <Description>{children}</Description>
                </Content>
            </InContainer>
        </OutContainer>
    );
}

export default Credit;