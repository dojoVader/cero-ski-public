import { Canvas } from './../Core/Canvas';

const canvas = new Canvas(1024, 768);
let context = null;
beforeAll(() => {
    canvas.createCanvas(); // Create the Canvas Object
   
})

test('Check that the canvas has a dom', ()=> {
    var domCanvas: HTMLCollection = document.getElementsByTagName('canvas');
    expect(domCanvas.length).toBeGreaterThan(0);
    expect(domCanvas.item(0).id).toMatch('skiCanvas');
});

