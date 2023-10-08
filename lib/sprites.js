import Animation from '/lib/animation.js';
import { drawDebugCollider } from './physicsBody.js';

export default class Sprite extends Animation {
    constructor(x, y, width, height, colliderShape = "rectangle", colliderType = "dynamic") {
        super();
        this._x = x; // private x position, calculated from planck.js body
        this._y = y; // private y position, calculated from planck.js body

        this._scale = 1; // scale of the sprite
        this.width = width; // width of the sprite
        this.height = height; // height of the sprite 
        this._colliderWidth = width; // width of the collider
        this._colliderHeight = height; // height of the collider

        this.autoDraw = true; // if the sprite should be drawn automatically
        this.spriteId = 1 + Math.random(); // id of the sprite
        this.colliderShape = colliderShape; // shape of the collider (rectangle or circle)
        this.colliderType = colliderType; // type of the collider (static or dynamic or none)
        this._layer = 1; // layer of the sprite
        this._img = undefined; // image of the sprite
        this._flipX = false; // if the sprite should be flipped on the X axis
        this._flipY = false; // if the sprite should be flipped on the Y axis

        // if the sprite has a collider, make a planck.js body for it
        if (this.colliderType !== "none") {
            this.makePlanckBody(x , y, width, height, colliderShape, colliderType, width, height);
        }

        // add the sprite to the layer
        lavishGE.allSprites["layer" + this._layer][this.spriteId] = this;
    }
    update(){
        this.updateVaribles();
        if (this.currentAnimation !== null) {
            this.animate();
            this.drawAnim();
        } else {
            this.draw();
        }
        // draw debug collider if debug is true
        if (this.colliderType !== "none" && this.debug) drawDebugCollider(this); 
    }
    updateVaribles(){
        let pos = this.getPosition(true);
        this._x = pos.x;
        this._y = pos.y;
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
    set flipX(flipX) {
        this._flipX = flipX;
    }
    set flipY(flipY) {
        this._flipY = flipY;
    }
}