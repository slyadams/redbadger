"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("./command");
const planet_1 = require("./planet");
exports.NORTH = "N";
exports.SOUTH = "S";
exports.EAST = "E";
exports.WEST = "W";
const lookup = ["N", "E", "S", "W"];
exports.rotate = (orientation, command) => {
    // not the most efficient, a simpler if statement would be quicker, but uglier
    const direction = command === command_1.RIGHT ? 1 : -1;
    let index = lookup.indexOf(orientation);
    if (index !== -1) {
        index = (index + direction) % lookup.length;
        return index < 0 ? lookup[lookup.length - 1] : lookup[index];
    }
    return orientation;
};
exports.move = (robotPosition, planet) => {
    let newRobotPosition = Object.assign({}, robotPosition);
    switch (robotPosition.orientation) {
        case exports.NORTH:
            newRobotPosition = Object.assign({}, newRobotPosition, { y: newRobotPosition.y + 1 });
            break;
        case exports.SOUTH:
            newRobotPosition = Object.assign({}, newRobotPosition, { y: newRobotPosition.y - 1 });
            break;
        case exports.EAST:
            newRobotPosition = Object.assign({}, newRobotPosition, { x: newRobotPosition.x + 1 });
            break;
        case exports.WEST:
            newRobotPosition = Object.assign({}, newRobotPosition, { x: newRobotPosition.x - 1 });
            break;
    }
    // off the planet?
    if (!planet_1.insidePlanet(planet, newRobotPosition)) {
        if (planet[robotPosition.y][robotPosition.x]) {
            // square is scented, ignore request
            return { robotPosition, planet, lost: false };
        }
        // square not scented, die and leave scent
        let newPlanet = planet.map(row => row.slice());
        newPlanet[robotPosition.y][robotPosition.x] = true;
        return { robotPosition: robotPosition, planet: newPlanet, lost: true };
    }
    // not off the planet
    return { robotPosition: newRobotPosition, planet, lost: false };
};
exports.processCommand = (robotPosition, command, planet) => {
    switch (command) {
        case command_1.LEFT:
        case command_1.RIGHT:
            return { robotPosition: Object.assign({}, robotPosition, { orientation: exports.rotate(robotPosition.orientation, command) }),
                planet,
                lost: false };
        case command_1.FORWARD:
            return exports.move(robotPosition, planet);
        default:
            return { robotPosition, planet, lost: false };
    }
};
exports.processCommands = (robotPosition, commands, planet) => {
    let lost = false;
    for (let i = 0; i < commands.length && !lost; i++) {
        ({ robotPosition, planet, lost } = exports.processCommand(robotPosition, commands[i], planet));
    }
    return { robotPosition, planet, lost };
};
