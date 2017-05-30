"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlanet = (top, right) => {
    return new Array(top + 1).fill(1).map(x => {
        return new Array(right + 1).fill(false);
    });
};
exports.insidePlanet = (planet, robotPosition) => {
    if (robotPosition.x < 0 || robotPosition.y < 0 ||
        robotPosition.x >= planet[0].length || robotPosition.y >= planet.length) {
        return false;
    }
    return true;
};
