import React, { Component } from 'react';

class Symbol extends Component {
    render() {
        return (
            <img src={this.props.src} alt="symbol" />
        );
    }
}

export default Symbol; 