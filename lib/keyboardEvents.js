export default class Keyboard {
    constructor(){
        this.lastKey = null;
        this.lastKeyDown = {};
        // add event listeners to the canvas

        window.addEventListener("keydown", this.keyDown.bind(this));
        window.addEventListener("keyup", this.keyUp.bind(this));
    }
    keyDown(event){
        this.lastKey = event.key;
        this.lastKeyDown[event.key.toLowerCase()] = true;
        this.lastKeyDown[event.key.toUpperCase()] = true;
    }

    isKeyDown(key){
        // if passed value of key is interger get char from it
        if (typeof key === "number"){
            key = String.fromCharCode(key);
        }

        if (this.lastKeyDown[key] == true){
            return true;
        }
        return false;
    }

    keyUp(event){
        delete this.lastKeyDown[event.key.toLowerCase()];
        delete this.lastKeyDown[event.key.toUpperCase()];
    }
}