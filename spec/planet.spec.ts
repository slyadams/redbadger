import { insidePlanet, Planet } from './../src/lib/planet';

describe("Planet", function () {
    let planet;
    const top = 5;
    const right = 7;
    
    beforeEach(function() {
        planet = new Array(top + 1).fill(new Array(right + 1).fill(false));
    });

    it("inside", function() {
        expect(insidePlanet(planet, { x: 0, y: 0, orientation: null })).toBe(true);
        expect(insidePlanet(planet, { x: 1, y: 2, orientation: null })).toBe(true);
        expect(insidePlanet(planet, { x: 7, y: 3, orientation: null })).toBe(true);
        expect(insidePlanet(planet, { x: 2, y: 5, orientation: null })).toBe(true);
        expect(insidePlanet(planet, { x: 7, y: 5, orientation: null })).toBe(true);
    })

    it("outside", function() {
        expect(insidePlanet(planet, { x: -1, y: 0, orientation: null })).toBe(false);
        expect(insidePlanet(planet, { x: 0, y: -1, orientation: null })).toBe(false);
        expect(insidePlanet(planet, { x: 8, y: 1, orientation: null })).toBe(false);
        expect(insidePlanet(planet, { x: 1, y: 6, orientation: null })).toBe(false);
        expect(insidePlanet(planet, { x: 8, y: 6, orientation: null })).toBe(false);
    })
});