import { move, RobotPosition, processCommand, processCommands } from './lib/robot';
import { Command } from './lib/command';
import { Planet, createPlanet } from './lib/planet';
const getStdin = require('get-stdin');

getStdin().then(str => {
    // note handling bad data, seems out of scope of this exercise
    const lines: string[] = str.split('\n');
    const [right, top] = lines.shift().split(' ').map(Number);
    let planet: Planet = createPlanet(top, right);

    while (lines.length > 1) {
        const [ strX, strY, orientation ] = lines.shift().split(' ');
        let robotPosition: RobotPosition = { x: Number(strX), y: Number(strY), orientation };
        const commands: Command[] = lines.shift().split('');
        let lost;
        ({ robotPosition, planet, lost} = processCommands(robotPosition, commands, planet));
        console.log(`${robotPosition.x} ${robotPosition.y} ${robotPosition.orientation} ${lost ? 'LOST' : ''}`);
    }
}).catch(err => {
    console.error(err);
});