import { Command, LEFT, RIGHT, FORWARD } from './command';
import { Planet, insidePlanet } from './planet';

export interface RobotPosition {
    x: number
    y: number
    orientation: Orientation
}

export type Orientation = string;
export const NORTH   = "N";
export const SOUTH   = "S";
export const EAST    = "E";
export const WEST    = "W";

const lookup: string[] = ["N", "E", "S", "W"];

export const rotate = (orientation: Orientation, command: Command): Orientation => {
    // not the most efficient, a simpler if statement would be quicker, but uglier
    const direction = command === RIGHT ? 1 : -1;
    let index = lookup.indexOf(orientation);
    if (index !== -1) {
        index = (index + direction) % lookup.length;
        return index < 0 ? lookup[lookup.length - 1] : lookup[index];
    }
    return orientation;
}

export const move = (robotPosition: RobotPosition, planet: Planet): { robotPosition: RobotPosition, planet: Planet, lost: boolean } => {
    let newRobotPosition = { ...robotPosition };
    switch (robotPosition.orientation) {
        case NORTH:
            newRobotPosition = { ...newRobotPosition, y: newRobotPosition.y + 1 };
            break;
        case SOUTH:
            newRobotPosition = { ...newRobotPosition, y: newRobotPosition.y - 1 };
            break;
        case EAST:
            newRobotPosition = { ...newRobotPosition, x: newRobotPosition.x + 1 };
            break;
        case WEST:
            newRobotPosition = { ...newRobotPosition, x: newRobotPosition.x - 1 };
            break;
    }

    // off the planet?
    if (!insidePlanet(planet, newRobotPosition)) {
        if (planet[robotPosition.y][robotPosition.x]) {
            // square is scented, ignore request
            return { robotPosition, planet, lost: false };
        }

        // square not scented, die and leave scent
        let newPlanet = planet.map(row => row.slice() );
        newPlanet[robotPosition.y][robotPosition.x] = true;
        return { robotPosition: robotPosition, planet: newPlanet, lost: true };
    }
    // not off the planet
    return { robotPosition: newRobotPosition, planet, lost: false };
}

export const processCommand = (robotPosition: RobotPosition, command: Command, planet: Planet): { robotPosition: RobotPosition, planet: Planet, lost: boolean } => {
    switch (command) {
        case LEFT:
        case RIGHT:
            return { robotPosition: {...robotPosition, orientation: rotate(robotPosition.orientation, command) },
                     planet,
                     lost: false };
        case FORWARD:
            return move(robotPosition, planet)
        default:
            return { robotPosition, planet, lost: false };
    }
}

export const processCommands = (robotPosition: RobotPosition, commands: Command[], planet: Planet): { robotPosition: RobotPosition, planet: Planet, lost: boolean } => {
    let lost = false;
    for (let i=0; i < commands.length && !lost; i++) {
        ({ robotPosition, planet, lost } = processCommand(robotPosition, commands[i], planet));
    }
    return { robotPosition, planet, lost };
}