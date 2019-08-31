import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import tutorial from 'resources/tutorial/VIDEO/tutorial.mp4';
import page from 'resources/tutorial/PNG/tutorial07.jpg';

const Video = styled.video`
    width: 100%;
    height: 100%;
    ::controls-download-button {
        display:none;
    }
`;

const Image = styled.img`
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    cursor: pointer;
`;

// const Button = styled(Link)`
//     position: fixed;
//     left: 50%;
//     top: 75%;
//     width: 420px;
//     height: 60px;
//     border-radius: 30px;
//     cursor: pointer;
//     transform: translate(-50%, -75%);
// `;

class Tutorial extends Component {    
    constructor(props) {
        super(props);

        this.state = { isPlaying: true };
    }

    handleEnded = (event) => {
        this.setState({ isPlaying: false });
    }

    render() {
        const videoView = (
            <Video autoPlay controls controlsList="nodownload" onEnded={this.handleEnded}>
                <source src={tutorial} type="video/mp4" />
            </Video>
        );
        const pageView = (            
            <div>  
                <Link to="/main">              
                    <Image src={page} draggable="false"/>
                </Link>
            </div>
        );

        return this.state.isPlaying ? videoView : pageView;
    };
};

export default Tutorial;