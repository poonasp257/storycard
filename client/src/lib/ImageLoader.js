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

import solution01 from 'resources/solutions/solution01.png';
import solution02 from 'resources/solutions/solution02.png';
import solution03 from 'resources/solutions/solution03.png';
import solution04 from 'resources/solutions/solution04.png';
import solution05 from 'resources/solutions/solution05.png';
import solution06 from 'resources/solutions/solution06.png';
import solution07 from 'resources/solutions/solution07.png';
import solution08 from 'resources/solutions/solution08.png';
import solution09 from 'resources/solutions/solution09.png';
import solution10 from 'resources/solutions/solution10.png';
import solution11 from 'resources/solutions/solution11.png';
import solution12 from 'resources/solutions/solution12.png';
import solution13 from 'resources/solutions/solution13.png';
import solution14 from 'resources/solutions/solution14.png';
import solution15 from 'resources/solutions/solution15.png';
import solution16 from 'resources/solutions/solution16.png';
import solution17 from 'resources/solutions/solution17.png';
import solution18 from 'resources/solutions/solution18.png';
import solution19 from 'resources/solutions/solution19.png';
import solution20 from 'resources/solutions/solution20.png';

import post01 from 'resources/post/post01.png';

const conflicts = [
    conflict01, conflict02, conflict03, conflict04, conflict05, conflict06,
    conflict07, conflict08, conflict09, conflict10, conflict11, conflict12,
    conflict13, conflict14, conflict15, conflict16, conflict17, conflict18,
    conflict19, conflict20
];

const solutions = [
    solution01, solution02, solution03, solution04, solution05, solution06,
    solution07, solution08, solution09, solution10, solution11, solution12,
    solution13, solution14, solution15, solution16, solution17, solution18,
    solution19, solution20
];

const posts = [
    post01
];

export default function ImageLoader(category) {
    switch(category)
    {
        case 'conflict': return conflicts;
        case 'solution': return solutions;
        case 'post': return posts;
        default: return null;
    }
}