import { createPlanet } from './../src/lib/planet';
import { RobotPosition } from './../src/lib/robot';
import { rotate, move, NORTH, SOUTH, EAST, WEST, processCommands } from './../src/lib/robot';

describe("Robot", function() {

  describe("turns", function() {

    it("right", function() {
      expect(rotate("N", "R")).toEqual("E");
      expect(rotate("E", "R")).toEqual("S");
      expect(rotate("S", "R")).toEqual("W");
      expect(rotate("W", "R")).toEqual("N");
    });

    it("left", function() {
      expect(rotate("N", "L")).toEqual("W");
      expect(rotate("E", "L")).toEqual("N");
      expect(rotate("S", "L")).toEqual("E");
      expect(rotate("W", "L")).toEqual("S");
    });

  });

  describe("moves", function() {

    let planet;
    const top = 5;
    const right = 7;
    
    beforeEach(function() {
      planet = createPlanet(top, right);
    })

    it("moves within planet", function() {
      const initialPosition = { x: 2, y: 3 };
      expect(move({...initialPosition, orientation: NORTH}, planet)).toEqual({ robotPosition: {...initialPosition, y: 4, orientation: NORTH }, planet, lost: false});
      expect(move({...initialPosition, orientation: SOUTH}, planet)).toEqual({ robotPosition: {...initialPosition, y: 2, orientation: SOUTH }, planet, lost: false});
      expect(move({...initialPosition, orientation: EAST}, planet)).toEqual({ robotPosition: {...initialPosition, x: 3, orientation: EAST }, planet, lost: false});
      expect(move({...initialPosition, orientation: WEST}, planet)).toEqual({ robotPosition: {...initialPosition, x: 1, orientation: WEST }, planet, lost: false});
    });

    it("moves outside planet with no scent", function() {
      const planet = createPlanet(top, right);
      const initialPosition = { x: 2, y: 3 };
      let expectedPlanet = createPlanet(top, right);
      expectedPlanet[0][1] = true;
      expect(move({x: 1, y: 0, orientation: SOUTH}, planet)).toEqual({ robotPosition: {x: 1, y: 0, orientation: SOUTH }, planet: expectedPlanet, lost: true});
    });

    it("moves outside, scents and survives", function() {
      const planet = createPlanet(top, right);
      const initialPosition = { x: 2, y: 3 };
      // scent square
      planet[0][1] = true;
      expect(move({x: 1, y: 0, orientation: SOUTH}, planet)).toEqual({ robotPosition: {x: 1, y: 0, orientation: SOUTH }, planet, lost: false});
    });

  });

  describe("runs sample commands", function() {
    let planet = createPlanet(3, 5);
    let expectedPlanet = createPlanet(3, 5);

    it("command 1", function() {
      expect(processCommands({ x: 1, y: 1, orientation: EAST }, 'RFRFRFRF'.split(''), planet)).toEqual({ robotPosition: { x: 1, y: 1, orientation: EAST }, planet: expectedPlanet, lost: false });
    });

    it("command 2", function() {
      expectedPlanet[3][3] = true;
      expect(processCommands({ x: 3, y: 2, orientation: NORTH }, 'FRRFLLFFRRFLL'.split(''), planet)).toEqual({ robotPosition: { x: 3, y: 3, orientation: NORTH }, planet: expectedPlanet, lost: true });
    });

    it("command 3", function() {
      // update planet per expected planet state in the test doc
      planet[3][3] = true;
      expect(processCommands({ x: 0, y: 3, orientation: WEST }, 'LLFFFLFLFL'.split(''), planet)).toEqual({ robotPosition: { x: 2, y: 3, orientation: SOUTH }, planet: expectedPlanet, lost: false });
    });

  });

});
