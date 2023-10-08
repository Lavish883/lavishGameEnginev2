import Sprite from './sprites.js';
import Keyboard from './keyboardEvents.js';

const timeStep = 1 / 60;
const velocityIterations = 10;
const positionIterations = 8;


function drawAllSprites() {
    // draw based on the layer system
    for (var i = 0; i < window.lavishGE.highestLayer; i++) {
        var sprites = Object.keys(window.lavishGE.allSprites["layer" + (i + 1)]);
        for (var j = 0; j < sprites.length; j++) {
            window.lavishGE.allSprites["layer" + (i + 1)][sprites[j]].update();
        }
    }
    lavishGE.world.step(timeStep, velocityIterations, positionIterations);
    lavishGE.world.clearForces();
}

let world = new planck.World({
    gravity: new planck.Vec2(0, 10),
})

console.log(world.Settings)

function init(){
    //let keyboard = new Keyboard(lavishGE.canvasId);
    //lavishGE.Keyboard = keyboard;
}

const lavishGE = {
    Sprite: Sprite,
    draw: drawAllSprites,
    highestLayer: 3,
    allSprites: {
        layer1: {},
        layer2: {},
        layer3: {},
    },
    world: world,
    positionRectMode: "corner", // center or corner
    canvasId: "defaultCanvas0",
    init: init,
    Keyboard: new Keyboard(),
}

window.lavishGE = lavishGE;
