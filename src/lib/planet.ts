import { RobotPosition } from './robot';

export type Planet = boolean[][];

export const createPlanet = (top: number, right: number): Planet => {
    return new Array(top + 1).fill(1).map(x => {
        return new Array(right + 1).fill(false)
    });
}

export const insidePlanet = (planet: Planet, robotPosition: RobotPosition): boolean => {
    if (robotPosition.x < 0 || robotPosition.y < 0 ||
        robotPosition.x >= planet[0].length || robotPosition.y >= planet.length) {
            return false;
    }
    return true;
}