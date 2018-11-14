let MAXSPEED=200;
let STEPX=100;
let STEPY=85;
let ROWS=5;
// also change the rows in the engine.js

var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.speed = MAXSPEED+ Math.floor(Math.random()*MAXSPEED);
    this.x=0;
    this.y=50 + STEPY *Math.floor(Math.random()*3);
};

// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x+=this.speed*dt;
    if(this.x>500){
        this.y=50 + STEPY *Math.floor(Math.random()*ROWS);
        this.x=0;
        this.speed = MAXSPEED+ Math.floor(Math.random()*MAXSPEED);
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


class Player{
    constructor(){
        this.x=100;
        this.y=600;
        this.sprite = 'images/char-boy.png';
    }
    update(){
        if(this.y>500) this.y=500;
        if(this.x>400) this.x=400;
        if(this.x<0) this.x=0;
    }
    handleInput(code){
        switch(code){
            case 'left': this.x-=STEPX; break;
            case 'right': this.x+=STEPX; break;
            case 'up':  this.y-=STEPY; break;
            case 'down': this.y+=STEPY; break;
        }
    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    reset(){
        this.x=100;
        this.y=500;
        console.log("COLLISION DETECTED!");
    }
}

let allEnemies = [ new Enemy(),new Enemy(), new Enemy(), new Enemy(), new Enemy()];

let player =   new Player();
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
