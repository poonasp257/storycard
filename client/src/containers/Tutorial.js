import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import tutorial from 'resources/tutorial/VIDEO/tutorial.mp4';
import page from 'resources/tutorial/PNG/tutorial07.jpg';

const Video = styled.video`
    width: 100%;
    height: 100vh;
    object-fit: fill;
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
            <Video 
                autoPlay 
                controls 
                controlsList="nodownload" 
                onEnded={this.handleEnded}
            >
                <source src={tutorial} type="video/mp4"/>
            </Video>
        );
        const pageView = (     
            <Link to="/main">              
                <Image src={page} draggable="false"/>
            </Link>
        );

        return this.state.isPlaying ? videoView : pageView;
    };
};

export default Tutorial;