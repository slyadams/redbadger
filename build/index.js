"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const robot_1 = require("./lib/robot");
const planet_1 = require("./lib/planet");
const getStdin = require('get-stdin');
getStdin().then(str => {
    // note handling bad data, seems out of scope of this exercise
    const lines = str.split('\n');
    const [right, top] = lines.shift().split(' ').map(Number);
    let planet = planet_1.createPlanet(top, right);
    while (lines.length > 1) {
        const [strX, strY, orientation] = lines.shift().split(' ');
        let robotPosition = { x: Number(strX), y: Number(strY), orientation };
        const commands = lines.shift().split('');
        let lost;
        ({ robotPosition, planet, lost } = robot_1.processCommands(robotPosition, commands, planet));
        console.log(`${robotPosition.x} ${robotPosition.y} ${robotPosition.orientation} ${lost ? 'LOST' : ''}`);
    }
}).catch(err => {
    console.error(err);
});
