import React from 'react';
import styled from 'styled-components';
import { BackButton } from 'components';

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
        width: 100%;
        height: 100%;
        margin: 0 auto;
        background-image: url(${background});
        background-repeat: no-repeat;
        background-size: auto;
    `;
        
    const Button = styled.div`
        position: absolute;
        left: 10%;
        top: 7%;
    `; 

    const Content = styled.div`    
        text-align: center;
        width: ${window.screen.width - 180 * 2}px;
        height: ${window.screen.height}px;
        margin-left: 180px;
    `;

    const Title = styled.img`
        margin-top: 130px;
    `;

    const ProfessorList = styled.div`
        margin: 30px auto;
    `;

    const StudentList = styled.div`
        margin: 320px auto;
    `;

    

    return (
        <Container>
            <Button><BackButton to="/" size="30px"/></Button>
            <Content>
                <Title src={title} />
                <ProfessorList>
                    <Professor name="Hyun-Jee Kim" role="Assistant Professor" photo={photo01}>
                        School of Games, Game Graphic Design,<br/>
                        Hongik University
                    </Professor>
                    <Professor name="Byung-Chull Bae" role="Assistant Professor" photo={photo02}>
                        School of Games, Game Software,<br/>
                        Hongik University
                    </Professor>
                </ProfessorList>
                <StudentList>
                    <Student bg={profile01} name="Lee Hye-rin" photo={photo03}>
                        Digital Media Design,<br/>
                        Hongik University
                    </Student>
                    <Student bg={profile02} name="Lee Jun Young" photo={photo04}>
                        Game Software,<br/>
                        Hongik University
                    </Student>
                    <Student bg={profile03} name="O Neul" photo={photo05}>
                        Digital Media Design,<br/>
                        Hongik University
                    </Student>
                </StudentList>
            </Content>
        </Container>
    );
};

function Professor({ name, photo, role, children }) {
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

    const Role = styled.div`
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
            <Photo src={photo}/>
            <Content>
                <Role>{role}</Role>
                <Description>{children}</Description>
            </Content>
        </Container>
    );
}

function Student({ bg, name, photo, role, children }) {
    const OutContainer = styled.div`
        position: relative;
        width: 500px;
        height: 210px;
        display: inline-block;
        background: url(${bg});
        background-repeat: no-repeat;
        font-family: 'Space Mono', monospace;
    `;

    const InContainer = styled.div`
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
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
                <Photo src={photo}/>
                <Content>
                    <Name>{name}</Name>
                    <Description>{children}</Description>
                </Content>
            </InContainer>
        </OutContainer>
    );
}

export default Credit;