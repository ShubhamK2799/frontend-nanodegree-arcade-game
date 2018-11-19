let MAXSPEED=200;
let STEPX=100;
let STEPY=85;
let ROWS=5;
// also change the rows in the engine.js

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = MAXSPEED+ Math.floor(Math.random()*MAXSPEED);
    this.x=0;
    this.y=50 + STEPY *Math.floor(Math.random()*3);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x+=this.speed*dt;
    if(this.x>500){
        this.y=50 + STEPY *Math.floor(Math.random()*ROWS);
        this.x=0;
        this.speed = MAXSPEED+ Math.floor(Math.random()*MAXSPEED);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// The player class that will create the instance of the player in the game
class Player{
    // Initailize the player coordinates and the sprite
    constructor(){
        this.x=100;
        this.y=600;
        this.sprite = 'images/char-boy.png';
    }
    // Clamp the player coordinates so that it remains within the canvas
    // Update the player position after checking to make it stay within the canvas
    update(){
        if(this.y>500) this.y=500;
        if(this.x>400) this.x=400;
        if(this.x<0) this.x=0;
    }

    // Change the coordinates according to the keycode
    handleInput(code){
        switch(code){
            case 'left': this.x-=STEPX; break;
            case 'right': this.x+=STEPX; break;
            case 'up':  this.y-=STEPY; break;
            case 'down': this.y+=STEPY; break;
        }
    }
    //Draw the player on the screen
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    //Reset the player position in case it collides with the enemy
    reset(){
        this.x=100;
        this.y=500;
        console.log("COLLISION DETECTED!");
    }
}


// All the enemy objects are in this allEnemies array
let allEnemies = [ new Enemy(),new Enemy(), new Enemy(), new Enemy(), new Enemy()];


// Instantiating the palyer 
let player =   new Player();

// This listens for key presses and sends the keys to your
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
