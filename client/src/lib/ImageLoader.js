import conflict01 from 'resources/conflicts/conflict01.png';
import conflict02 from 'resources/conflicts/conflict02.png';
import conflict03 from 'resources/conflicts/conflict03.png';
import conflict04 from 'resources/conflicts/conflict04.png';
import conflict05 from 'resources/conflicts/conflict05.png';
import conflict06 from 'resources/conflicts/conflict06.png';
import conflict07 from 'resources/conflicts/conflict07.png';
import conflict08 from 'resources/conflicts/conflict08.png';
import conflict09 from 'resources/conflicts/conflict09.png';
import conflict10 from 'resources/conflicts/conflict10.png';
import conflict11 from 'resources/conflicts/conflict11.png';
import conflict12 from 'resources/conflicts/conflict12.png';
import conflict13 from 'resources/conflicts/conflict13.png';
import conflict14 from 'resources/conflicts/conflict14.png';
import conflict15 from 'resources/conflicts/conflict15.png';
import conflict16 from 'resources/conflicts/conflict16.png';
import conflict17 from 'resources/conflicts/conflict17.png';
import conflict18 from 'resources/conflicts/conflict18.png';
import conflict19 from 'resources/conflicts/conflict19.png';
import conflict20 from 'resources/conflicts/conflict20.png';

import resolution01 from 'resources/resolutions/resolution01.png';
import resolution02 from 'resources/resolutions/resolution02.png';
import resolution03 from 'resources/resolutions/resolution03.png';
import resolution04 from 'resources/resolutions/resolution04.png';
import resolution05 from 'resources/resolutions/resolution05.png';
import resolution06 from 'resources/resolutions/resolution06.png';
import resolution07 from 'resources/resolutions/resolution07.png';
import resolution08 from 'resources/resolutions/resolution08.png';
import resolution09 from 'resources/resolutions/resolution09.png';
import resolution10 from 'resources/resolutions/resolution10.png';
import resolution11 from 'resources/resolutions/resolution11.png';
import resolution12 from 'resources/resolutions/resolution12.png';
import resolution13 from 'resources/resolutions/resolution13.png';
import resolution14 from 'resources/resolutions/resolution14.png';
import resolution15 from 'resources/resolutions/resolution15.png';
import resolution16 from 'resources/resolutions/resolution16.png';
import resolution17 from 'resources/resolutions/resolution17.png';
import resolution18 from 'resources/resolutions/resolution18.png';
import resolution19 from 'resources/resolutions/resolution19.png';
import resolution20 from 'resources/resolutions/resolution20.png';

const conflicts = [
    conflict01, conflict02, conflict03, conflict04, conflict05, conflict06,
    conflict07, conflict08, conflict09, conflict10, conflict11, conflict12,
    conflict13, conflict14, conflict15, conflict16, conflict17, conflict18,
    conflict19, conflict20
];

const resolutions = [
    resolution01, resolution02, resolution03, resolution04, resolution05, resolution06,
    resolution07, resolution08, resolution09, resolution10, resolution11, resolution12,
    resolution13, resolution14, resolution15, resolution16, resolution17, resolution18,
    resolution19, resolution20
]; 

export default function ImageLoader(category) {
    switch(category)
    {
        case 'conflict': return conflicts;
        case 'resolution': return resolutions;
        default: return null;
    }
}