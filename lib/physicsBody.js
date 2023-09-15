export default class PhysicsBody {
    constructor() {

    }
    makePlanckBody(x, y, width, height, colliderShape, colliderType, colliderWidth, colliderHeight) {
        // create the planck body
        var xPos, yPos;
       // console.log(x, y);
        xPos = (x + (width * this._scale) / 2) / 100;
        yPos = ((y + (height * this._scale)/2)) / 100;
       // console.log(xPos * 100, yPos * 100);
        this.planckBody = window.lavishGE.world.createBody({
            type: colliderType,
            position: planck.Vec2(lavishGE.positionRectMode == "corner" ? xPos : x / 100, lavishGE.positionRectMode == "corner" ? yPos : y / 100),
        });

        // this is your collider box, width/2 and height/2 because the x and y are the center of the box
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
            this.makePlanckBody(this.x, this.y, this.width, this.height, this.colliderShape, this.colliderType, this._colliderWidth, this._colliderHeight);
            this.bouncieness = this._bouncieness;
        }
    }
    set colliderWidth(width) {    
        this._colliderWidth = width;
        let pos = this.getPosition(true);
        lavishGE.world.destroyBody(this.planckBody);
        this.makePlanckBody(this.x, this.y, this.width, this.height, this.colliderShape, this.colliderType, this._colliderWidth, this._colliderHeight);
    }
    set colliderHeight(height) {
        this._colliderHeight = height;
        lavishGE.world.destroyBody(this.planckBody);
        this.makePlanckBody(this.x, this.y, this.width, this.height, this.colliderShape, this.colliderType, this._colliderWidth, this._colliderHeight);
    }
    getPosition(centerItForDraw) {
        var pos;
        if (this.colliderType !== "none") {
            var pos = { x: this.planckBody.getPosition().x * 100, y : this.planckBody.getPosition().y * 100 } 
        } else {
            var pos = { x: this.x, y : this.y };
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
        let vertices = sprite.planckBody.getFixtureList().getShape().m_vertices;
        // draw collider borders
        line(pos.x + vertices[0].x * 100, pos.y + vertices[0].y * 100, pos.x + vertices[1].x * 100, pos.y + vertices[1].y * 100)
        line(pos.x + vertices[1].x * 100, pos.y + vertices[1].y * 100, pos.x + vertices[2].x * 100, pos.y + vertices[2].y * 100)
        line(pos.x + vertices[2].x * 100, pos.y + vertices[2].y * 100, pos.x + vertices[3].x * 100, pos.y + vertices[3].y * 100)
        line(pos.x + vertices[3].x * 100, pos.y + vertices[3].y * 100, pos.x + vertices[0].x * 100, pos.y + vertices[0].y * 100)
        // draw offset
        line(pos.x, pos.y + 3, pos.x, pos.y - 3);
        line(pos.x - 3, pos.y, pos.x + 3, pos.y);

        let drawPos = sprite.getPosition(true);
        // draw collider of the sprite
        stroke("gray");
        rect(drawPos.x,drawPos.y, sprite.width * sprite.scale, sprite.height * sprite.scale);

    }
    pop();
}