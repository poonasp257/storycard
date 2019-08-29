import conflict01 from 'resources/main/PNG/conflict01.png';
import conflict02 from 'resources/main/PNG/conflict02.png';
import conflict03 from 'resources/main/PNG/conflict03.png';
import conflict04 from 'resources/main/PNG/conflict04.png';
import conflict05 from 'resources/main/PNG/conflict05.png';
import conflict06 from 'resources/main/PNG/conflict06.png';
import conflict07 from 'resources/main/PNG/conflict07.png';
import conflict08 from 'resources/main/PNG/conflict08.png';
import conflict09 from 'resources/main/PNG/conflict09.png';
import conflict10 from 'resources/main/PNG/conflict10.png';
import conflict11 from 'resources/main/PNG/conflict11.png';
import conflict12 from 'resources/main/PNG/conflict12.png';
import conflict13 from 'resources/main/PNG/conflict13.png';
import conflict14 from 'resources/main/PNG/conflict14.png';
import conflict15 from 'resources/main/PNG/conflict15.png';
import conflict16 from 'resources/main/PNG/conflict16.png';
import conflict17 from 'resources/main/PNG/conflict17.png';
import conflict18 from 'resources/main/PNG/conflict18.png';
import conflict19 from 'resources/main/PNG/conflict19.png';
import conflict20 from 'resources/main/PNG/conflict20.png';

import resolution01 from 'resources/main/PNG/resolution01.png';
import resolution02 from 'resources/main/PNG/resolution02.png';
import resolution03 from 'resources/main/PNG/resolution03.png';
import resolution04 from 'resources/main/PNG/resolution04.png';
import resolution05 from 'resources/main/PNG/resolution05.png';
import resolution06 from 'resources/main/PNG/resolution06.png';
import resolution07 from 'resources/main/PNG/resolution07.png';
import resolution08 from 'resources/main/PNG/resolution08.png';
import resolution09 from 'resources/main/PNG/resolution09.png';
import resolution10 from 'resources/main/PNG/resolution10.png';
import resolution11 from 'resources/main/PNG/resolution11.png';
import resolution12 from 'resources/main/PNG/resolution12.png';
import resolution13 from 'resources/main/PNG/resolution13.png';
import resolution14 from 'resources/main/PNG/resolution14.png';
import resolution15 from 'resources/main/PNG/resolution15.png';
import resolution16 from 'resources/main/PNG/resolution16.png';
import resolution17 from 'resources/main/PNG/resolution17.png';
import resolution18 from 'resources/main/PNG/resolution18.png';
import resolution19 from 'resources/main/PNG/resolution19.png';
import resolution20 from 'resources/main/PNG/resolution20.png';

import post01 from 'resources/main/PNG/postIt-yellow.png';
import post02 from 'resources/main/PNG/postIt-red.png';
import post03 from 'resources/main/PNG/postIt-purple.png';
import post04 from 'resources/main/PNG/postIt-green.png';
import post05 from 'resources/main/PNG/postIt-blue.png';

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