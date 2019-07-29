import symbol00 from 'resources/symbol00.png';
import symbol01 from 'resources/symbol01.png';
import symbol02 from 'resources/symbol02.png';
import symbol03 from 'resources/symbol03.png';
import symbol04 from 'resources/symbol04.png';
import symbol05 from 'resources/symbol05.png';
import symbol06 from 'resources/symbol06.png';
import symbol07 from 'resources/symbol07.png';
import symbol08 from 'resources/symbol08.png';
import symbol09 from 'resources/symbol09.png';
import symbol10 from 'resources/symbol10.png';
import symbol11 from 'resources/symbol11.png';
import symbol12 from 'resources/symbol12.png';
import symbol13 from 'resources/symbol13.png';
import symbol14 from 'resources/symbol14.png';
import symbol15 from 'resources/symbol15.png';
import symbol16 from 'resources/symbol16.png';
import symbol17 from 'resources/symbol17.png';
import symbol18 from 'resources/symbol18.png';
import symbol19 from 'resources/symbol19.png';

import post01 from 'resources/post01.png';
import post02 from 'resources/post02.png';
import post03 from 'resources/post03.png';
import post04 from 'resources/post04.png';
import post05 from 'resources/post05.png';
import post06 from 'resources/post06.png';  

const Symbols = [
    symbol00, symbol01, symbol02, symbol03, symbol04,
    symbol05, symbol06, symbol07, symbol08, symbol09,
    symbol10, symbol11, symbol12, symbol13, symbol14,
    symbol15, symbol16, symbol17, symbol18, symbol19,
];

const Posts = [
    post01, post02, post03, post04, post05, post06
];

export default function ImageLoader(category) {
    let filter = /^(symbols|posts)$/;
    let filteredCategory = category.toLowerCase().replace(/ /gi, '');
    if(!filter.test(filteredCategory)) return null;
    
    if(filteredCategory === 'symbols') return Symbols;
    else if(filteredCategory === 'posts') return Posts;
}