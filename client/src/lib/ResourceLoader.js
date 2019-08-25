import conflict01 from 'resources/PNG/conflict01.png';
import conflict02 from 'resources/PNG/conflict02.png';
import conflict03 from 'resources/PNG/conflict03.png';
import conflict04 from 'resources/PNG/conflict04.png';
import conflict05 from 'resources/PNG/conflict05.png';
import conflict06 from 'resources/PNG/conflict06.png';
import conflict07 from 'resources/PNG/conflict07.png';
import conflict08 from 'resources/PNG/conflict08.png';
import conflict09 from 'resources/PNG/conflict09.png';
import conflict10 from 'resources/PNG/conflict10.png';
import conflict11 from 'resources/PNG/conflict11.png';
import conflict12 from 'resources/PNG/conflict12.png';
import conflict13 from 'resources/PNG/conflict13.png';
import conflict14 from 'resources/PNG/conflict14.png';
import conflict15 from 'resources/PNG/conflict15.png';
import conflict16 from 'resources/PNG/conflict16.png';
import conflict17 from 'resources/PNG/conflict17.png';
import conflict18 from 'resources/PNG/conflict18.png';
import conflict19 from 'resources/PNG/conflict19.png';
import conflict20 from 'resources/PNG/conflict20.png';

import resolution01 from 'resources/PNG/resolution01.png';
import resolution02 from 'resources/PNG/resolution02.png';
import resolution03 from 'resources/PNG/resolution03.png';
import resolution04 from 'resources/PNG/resolution04.png';
import resolution05 from 'resources/PNG/resolution05.png';
import resolution06 from 'resources/PNG/resolution06.png';
import resolution07 from 'resources/PNG/resolution07.png';
import resolution08 from 'resources/PNG/resolution08.png';
import resolution09 from 'resources/PNG/resolution09.png';
import resolution10 from 'resources/PNG/resolution10.png';
import resolution11 from 'resources/PNG/resolution11.png';
import resolution12 from 'resources/PNG/resolution12.png';
import resolution13 from 'resources/PNG/resolution13.png';
import resolution14 from 'resources/PNG/resolution14.png';
import resolution15 from 'resources/PNG/resolution15.png';
import resolution16 from 'resources/PNG/resolution16.png';
import resolution17 from 'resources/PNG/resolution17.png';
import resolution18 from 'resources/PNG/resolution18.png';
import resolution19 from 'resources/PNG/resolution19.png';
import resolution20 from 'resources/PNG/resolution20.png';

import post01 from 'resources/PNG/postIt-yellow.png';
import post02 from 'resources/PNG/postIt-red.png';
import post03 from 'resources/PNG/postIt-purple.png';
import post04 from 'resources/PNG/postIt-green.png';
import post05 from 'resources/PNG/postIt-blue.png';

const resolutions = [
    resolution01, resolution02, resolution03, resolution04, resolution05, resolution06,
    resolution07, resolution08, resolution09, resolution10, resolution11, resolution12,
    resolution13, resolution14, resolution15, resolution16, resolution17, resolution18,
    resolution19, resolution20
]; 

const conflicts = [
    conflict01, conflict02, conflict03, conflict04, conflict05, conflict06,
    conflict07, conflict08, conflict09, conflict10, conflict11, conflict12,
    conflict13, conflict14, conflict15, conflict16, conflict17, conflict18,
    conflict19, conflict20
];

const posts = [
    post01, post02, post03, post04, post05 
];

export default function ImageLoader(category) {
    switch(category)
    {
        case 'conflict': return conflicts;
        case 'resolution': return resolutions;
        case 'post': return posts;
        default: return null;
    }
}