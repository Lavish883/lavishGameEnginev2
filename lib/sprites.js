import Animation from '/lib/animation.js';
import { drawDebugCollider } from './physicsBody.js';

export default class Sprite extends Animation {
    constructor(x, y, width, height, colliderShape = "rectangle", colliderType = "dynamic") {
        super();
        this.x = x;
        this.y = y;

        this._scale = 1;
        this.width = width;
        this.height = height;
        this._colliderWidth = width;
        this._colliderHeight = height;

        this.autoDraw = true;
        this.spriteId = 1 + Math.random();
        this.colliderShape = colliderShape;
        this.colliderType = colliderType;
        this._layer = 1;
        this._img = undefined;
        if (this.colliderType !== "none") {
            this.makePlanckBody(x , y, width, height, colliderShape, colliderType, width, height);
        }

        lavishGE.allSprites["layer" + this._layer][this.spriteId] = this;
    }
    update(){
        this.updateVaribles();
        if (this.currentAnimation !== null) {
            this.animate();
        } else {
            this.draw();
        }
        if (this.colliderType !== "none" && this.debug) drawDebugCollider(this); 
        console.log(this.getPosition(true).x, this.getPosition(true).y);
    }
    updateVaribles(){
        let pos = this.getPosition(true);
        this.x = pos.x;
        this.y = pos.y;
    }
    set layer(layer) {
        if (layer > window.lavishGE.highestLayer) {
            // now set the highest layer
            window.lavishGE.highestLayer = layer;
        }
        // check if the layer exists, if not, create it
        if (window.lavishGE.allSprites["layer" + layer] === undefined) {
            window.lavishGE.allSprites["layer" + layer] = [];
        }
        // now remover from old layer
        delete window.lavishGE.allSprites["layer" + this._layer][this.spriteId];
        // now add to new layer
        window.lavishGE.allSprites["layer" + layer][this.spriteId] = this;
        this._layer = layer;
    }
}