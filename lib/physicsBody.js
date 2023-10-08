export default class PhysicsBody {
    constructor() {

    }
    // makes a planck body
    makePlanckBody(x, y, width, height, colliderShape, colliderType, colliderWidth, colliderHeight) {
        // create the planck body, this position is the center of the sprite if the rectMode is set to corner
        var xPos, yPos;
        xPos = (x + (width * this._scale) / 2) / 100;
        yPos = ((y + (height * this._scale)/2)) / 100;

        // create the planck body
        this.planckBody = window.lavishGE.world.createBody({
            type: colliderType,
            position: planck.Vec2(lavishGE.positionRectMode == "corner" ? xPos : x / 100, lavishGE.positionRectMode == "corner" ? yPos : y / 100),
        });

        // this is your collider box, 
        if (colliderShape == "circle") {
            this.planckBody.createFixture(planck.Circle((colliderWidth * this._scale / 2/ 100)), {
                density: 1,
                friction: 0.3,
            });
        } else if (colliderShape == "rectangle") {
            this.planckBody.createFixture(planck.Box(((colliderWidth * this._scale / 2) / 100), ((colliderHeight * this._scale / 2) / 100)));
        }

        // now set the mass data, for collisions
        this.planckBody.setMassData({
            mass: 1,
            center: planck.Vec2(0, 0),
            I: 1,
        });
    }
    set bouncieness(bouncieness) {
        this._bouncieness = bouncieness;
        this.planckBody.m_fixtureList.setRestitution(bouncieness);
    }
    get scale() {
        return this._scale;
    }
    set scale(scale) {
        this._scale = scale;
        if (this.colliderType !== "none") {
            lavishGE.world.destroyBody(this.planckBody);
            this.makePlanckBody(this._x, this._y, this.width, this.height, this.colliderShape, this.colliderType, this._colliderWidth, this._colliderHeight);
            this.bouncieness = this._bouncieness;
        }
    }
    set colliderWidth(width) {    
        this._colliderWidth = width;
        lavishGE.world.destroyBody(this.planckBody);
        this.makePlanckBody(this._x, this._y, this.width, this.height, this.colliderShape, this.colliderType, this._colliderWidth, this._colliderHeight);
    }
    set colliderHeight(height) {
        this._colliderHeight = height;
        lavishGE.world.destroyBody(this.planckBody);
        this.makePlanckBody(this._x, this._y, this.width, this.height, this.colliderShape, this.colliderType, this._colliderWidth, this._colliderHeight);
    }
    getPosition(centerItForDraw) {
        var pos;
        if (this.colliderType !== "none") {
            var pos = { x: this.planckBody.getPosition().x * 100, y : this.planckBody.getPosition().y * 100 } 
        } else {
            var pos = { x: this._x, y : this._y };
        }

        if (centerItForDraw && this.colliderType !== "none") {
            pos.x -= this.width * this._scale / 2;
            pos.y -= this.height * this._scale / 2;
        }
        return pos;
    }
    set rotationFixed(value){
        if (typeof value !== boolean){
            throw new Error("Rotation Fixed property must be a boolean");
        }
        this.rotationFixed
    }
    get x(){
        return this._x;
    }
    get y(){
        return this._y;
    }
    set x(value){
        this.planckBody.setPosition(planck.Vec2((value + (this.width * this._scale) / 2) / 100, this.planckBody.getPosition().y));
    }
    set y(value){
        this.planckBody.setPosition(planck.Vec2(this.planckBody.getPosition().x, ((value + (this.height * this._scale) / 2)) / 100));
    }
    set velocityX(value){
        this.planckBody.setLinearVelocity(planck.Vec2(value, this.planckBody.getLinearVelocity().y));
        this.vx = value;
    }
    set velocityY(value){
        this.planckBody.setLinearVelocity(planck.Vec2(this.planckBody.getLinearVelocity().x, value));
        this.vy = value;
    }
    get velocityX(){
        return this.planckBody.getLinearVelocity().x
    }
    get velocityY(){
        return this.planckBody.getLinearVelocity().y
    }
}

export function drawDebugCollider(sprite) {
    // get the position of the sprite
    var pos = sprite.getPosition();
    push();
    noFill();
    stroke("red");

    // draw collider as a circle if it is a circle, or a rectangle if it is a rectangle
    if (sprite.colliderShape == "circle") {
        let radius = sprite.planckBody.getFixtureList().getShape().m_radius * 100;
        ellipse(pos.x, pos.y, radius * 2, radius * 2);
        // draw offset
        line(pos.x, pos.y + 3, pos.x, pos.y - 3);
        line(pos.x - 3, pos.y, pos.x + 3, pos.y);
    } else if (sprite.colliderShape == "rectangle") {
        // draw collider of the sprite, this one is gray to symbolize that where the x and y are is the center of the sprite will be used
        // that will not be used in the physics engine
        let drawPos = sprite.getPosition(true);
        stroke("gray");
        rect(drawPos.x,drawPos.y, sprite.width * sprite.scale, sprite.height * sprite.scale);

        // draw collider borders that will be used in the physics engine
        stroke("red");
        let vertices = sprite.planckBody.getFixtureList().getShape().m_vertices;
        line(pos.x + vertices[0].x * 100, pos.y + vertices[0].y * 100, pos.x + vertices[1].x * 100, pos.y + vertices[1].y * 100)
        line(pos.x + vertices[1].x * 100, pos.y + vertices[1].y * 100, pos.x + vertices[2].x * 100, pos.y + vertices[2].y * 100)
        line(pos.x + vertices[2].x * 100, pos.y + vertices[2].y * 100, pos.x + vertices[3].x * 100, pos.y + vertices[3].y * 100)
        line(pos.x + vertices[3].x * 100, pos.y + vertices[3].y * 100, pos.x + vertices[0].x * 100, pos.y + vertices[0].y * 100)
        // draw offset
        line(pos.x, pos.y + 3, pos.x, pos.y - 3);
        line(pos.x - 3, pos.y, pos.x + 3, pos.y);
    }
    pop();
}