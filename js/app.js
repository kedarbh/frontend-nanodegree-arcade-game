// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    // this.y = y;
    // this.speed = speed;
    this.y = Math.floor((Math.random() * 3) + 1)*70;
    this.speed = Math.floor((Math.random() * 3) + 1)*150;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed*dt;
    //if x value is greater takes time to reach the canvas so changed it to nearest values.
    if (this.x > 600) {
        this.x = -200;
    }
    this.onCollision();
};

//ref: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
Enemy.prototype.onCollision = function() {
    let playerLoc = { x: player.x, y: player.y, width: 50, height: 50};
    let enemyLoc = { x: this.x, y: this.y, width: 50, height: 50};
// check the collision and decrease life if true
      if (playerLoc.x < enemyLoc.x + enemyLoc.width &&
        playerLoc.y < enemyLoc.y + enemyLoc.height &&
        playerLoc.x + playerLoc.width > enemyLoc.x &&
        playerLoc.y + playerLoc.height > enemyLoc.y){
        player.lostLives();
        player.playerReset();
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    //display a player sprite
    this.sprite = 'images/char-boy.png';
}

// @description update the position of player to keep withn the boundaries
Player.prototype.update = function() {
    if(this.x < 0) {
        this.x = 0;
    }
    if(this.x > 400) {
        this.x = 400;
    }
    if(this.y < 0) {
        player.addScore();
        player.playerReset();
    }
    if(this.y > 400) {
        this.y = 400;
    }
};

Player.prototype.playerReset = function() {
    this.x = 200;
    this.y = 400;
};

Player.prototype.addScore = function() {
    score +=25;
    scoreCounts.innerHTML = `Score: ${score}`;
};

Player.prototype.lostLives = function() {
    life--;
    endGame();
    let lives = document.getElementById('lives');
    lives.removeChild(lives.firstElementChild);
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// @description: handle the key input from player to move the character
Player.prototype.handleInput = function(keyPressed) {
    switch (keyPressed) {
        case 'left':
            this.x -= 101;
            break;

        case 'right':
            this.x += 101;
            break;

        case 'up':
            this.y -= 83;
            break;

        case 'down':
            this.y += 83;
            break;
    }
};

function endGame() {
    if(life === 0){
    gameInfo.innerHTML = `
        <h1 class="heading-one">GAME OVER</h1>
        <p></p>
        <p class="text">Your score is ${score}.</p>
        <button class="play-again" onclick="restart()">Play Again</button>
        `;
        messageBox.classList.remove('hidden');
    }

}

function restart(){
    player.playerReset();
    messageBox.classList.add('hidden');
    score = 0;
    life = 3;
    for (let i = 0; i < life; i++) {
        lives.insertAdjacentHTML( 'afterbegin', '<li><i class="fas fa-heart"></i></li>');
    }
    scoreCounts.innerHTML = `Score: 0`;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


let allEnemies = [new Enemy(),new Enemy(),new Enemy(),new Enemy()];

let player = new Player(200,400,50);
let score = 0;
let life = 3;
let scoreCounts = document.querySelector('.score');
let messageBox = document.querySelector('.complete-message');
let gameInfo = document.querySelector('.popup');




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
