//Initializing Strict Mode
'use strict';

//Initializing Variables
var maxSpeed = 400;
var minSpeed = 200;
var modal = document.getElementById("wModal");


// Enemies our player must avoid
var Enemy = function(x,y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() *(maxSpeed-minSpeed + 1) + minSpeed);
};

//Constantly updates the enemies position
//moving them across the screen.
Enemy.prototype.update = function(dt) {
    if (this.x < 500) {
      this.x += this.speed * dt;
    }
    else {
      this.x = -100;
    }
};

// Draws enemies at the start of the game.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function (x,y) {
  this.sprite = 'images/char-boy.png';
  this.x=x;
  this.y=y;
};

//Update function called throughout the
// game to see if player has won or
// ran into an enemy.
Player.prototype.update = function() {
  if (this.y > 0) {
    for (var i = 0; i < allEnemies.length; i++) {
      if ((this.y == allEnemies[i].y) && (this.x < allEnemies[i].x + 50) && (this.x + 50 > allEnemies[i].x)) {
        alert('you got hit');
        this.reset();
      }
    }
  }
};

//Draws player at the start of the game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Resets the player back to the starting position
Player.prototype.reset = function() {
  this.x = 200;
  this.y = 400;
};


//Checks to see what arrow key was pressed and moves
//the character in the appropriate direction.
Player.prototype.handleInput = function(click) {
  switch (click) {
  case 'up':
  if (this.y > -50) {
    this.y -= 90;
  };

  break;
  case 'down':
  if (this.y < 400) {
    this.y += 90;
  };

  break;
  case 'left':
  if (this.x > 0) {
    this.x -= 100;
  };

  break;
  case 'right':
  if (this.x != 400) {;
    this.x += 100;
    };
  };
  if (this.y < 0){
    modal.classList.add('show');
    this.reset();
  }
};

//Creates enemies and places them into an array
//Creates the player character.
var a = new Enemy(0, 40);
var b = new Enemy(0, 130);
var c = new Enemy(0, 220);

var allEnemies = [a,b,c];
var player = new Player(200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Closes the modal pop up
function closePopup() {
  modal.classList.remove('show');
}
