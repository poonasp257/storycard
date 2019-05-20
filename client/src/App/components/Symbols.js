import React, { Component } from 'react';
import Symbol from './Symbol';
import Tile from '../resources/symbol_1.png'

class Symbols extends Component {
    render() {
        const images = [
            "../resources/symbol_1.png",
            "../resources/symbol_2.png",
            "../resources/symbol_3.png",
            "../resources/symbol_4.png"
        ];

        return (
            <div>
                <p>  {Tile} </p>
            </div>
        );
    }
}

export default Symbols; 