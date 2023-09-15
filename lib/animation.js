import PhysicsBody from './physicsBody.js';

export default class Animation extends PhysicsBody {
    constructor() {
        super();
        this.currentAnimation = null;
        this.anis = null;
        this.currentFrame = 0;
        this.currentDelayTime = 0;
    }
    drawShape(pos) {
        if (this.colliderShape == "rectangle") {
            rect(pos.x, pos.y, this.width * this._scale, this.height * this._scale);
        } else if (this.colliderShape == "circle") {
            ellipse(pos.x + this.width * this._scale / 2, pos.y + this.height * this._scale / 2, this.width * this._scale, this.height * this._scale);
        }
    }
    drawImage(pos) {
        image(
            this._img,
            pos.x,
            pos.y,
            this.width * this._scale,
            this.height * this._scale
        );
    }
    draw() {
        if (!this.autoDraw) return;
        if (this._img == undefined) return this.drawShape(this.getPosition(true));
        return this.drawImage(this.getPosition(true));
    }
    animate() {
        if (this.currentAnimation == null) return;
        this.currentDelayTime++;
        var animation = this.anis[this.currentAnimation];
        // an user can add a function to run before the animation
        if (animation.specialBeforefunc != undefined) animation.specialBeforefunc.bind(this)();

        if (this.currentDelayTime == animation.frameDelay) {
            // reset frames
            if (this.currentFrame >= animation.frameCount - 1) {
                this.currentFrame = 0;
            } else {
                this.currentFrame++;
            }
            this.currentDelayTime = 0;
            // an user can add a function to run when the frame changes
            if (animation.onChangeFrame != undefined) animation.onChangeFrame.bind(this)();
        }
        let pos = this.getPosition(true);
        
        image(
            this._img,
            pos.x,
            pos.y,
            this.width * this._scale, 
            this.height * this._scale, 
            animation.startX + this.currentFrame * animation.widthInImage, 
            animation.startY, 
            animation.widthInImage, 
            animation.heightInImage
        )
        // an user can add a function to run after the animation
        if (animation.specialAfterfunc != undefined) animation.specialAfterfunc.bind(this)();
    }
    set img(img) {
        if (typeof img == "string") {
            this._img = loadImage(img);
        } else {
            this._img = img;
        }
    }
    addAnis(anis, spriteSheetName = this._img, defaultAniName) {
        this.anis = anis;
        this._img = loadImage(spriteSheetName);
        if (defaultAniName != undefined) {
            this.currentAnimation = defaultAniName;
        }
    }
}