(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(288, 505, Phaser.AUTO, 'flappybird');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":6,"./states/gameover":7,"./states/menu":8,"./states/play":9,"./states/preload":10}],2:[function(require,module,exports){
'use strict';

var Bird = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'bird', frame);

  // Set the anchor to center
  this.anchor.setTo(0.5, 0.5);

  // add and play animations
  this.animations.add('flap');
  this.animations.play('flap', 12, true);

  // Set bird as dead until game starts
  // this.alive = false;

  // ADDING PHYSICS BODY TO BIRD
  this.game.physics.arcade.enableBody(this);
  // disable gravity until game starts
  // this.body.allowGravity = false;
  
};

Bird.prototype = Object.create(Phaser.Sprite.prototype);
Bird.prototype.constructor = Bird;

Bird.prototype.update = function() {

	// Check if bird's angle is less than 90 degrees
	// If so rotate the bird towards the ground by 2.5 degrees
	if (this.angle < 90) {
		this.angle += 2.5;
	}
  
  Bird.prototype.flap = function() {
  	// Make bird "jump" up when triggered
  	this.body.velocity.y = -400;

  	// rotate the bird to -40 degrees
  	this.game.add.tween(this).to({angle: -40}, 100).start();
  }
  
};

module.exports = Bird;

},{}],3:[function(require,module,exports){
'use strict';

var Ground = function(game, x, y, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, 'ground');

  // start scrolling the ground
  this.autoScroll(-200, 0);

  // enable physics on the ground sprite
  // This is needed for collision detection
  this.game.physics.arcade.enableBody(this);
  
  // Disable gravity on the ground
  // Don't want it falling for no reason
  this.body.allowGravity = false;

  // Make ground immovable from collision
  this.body.immovable = true;

};

Ground.prototype = Object.create(Phaser.TileSprite.prototype);
Ground.prototype.constructor = Ground;

Ground.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Ground;

},{}],4:[function(require,module,exports){
'use strict';

var Pipe = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'pipe', frame);

  this.anchor.setTo(0.5,0.5);
  this.game.physics.arcade.enableBody(this);

  this.body.allowGravity = false;
  this.body.immovable = true;
  
};

Pipe.prototype = Object.create(Phaser.Sprite.prototype);
Pipe.prototype.constructor = Pipe;

Pipe.prototype.update = function() {
  

  
};

module.exports = Pipe;

},{}],5:[function(require,module,exports){
'use strict';

var Pipe = require('./pipe');

var PipeGroup = function(game, parent) {
  Phaser.Group.call(this, game, parent);
  this.topPipe = new Pipe(this.game, 0, 0, 0);
  this.add(this.topPipe);

  this.bottomPipe = new Pipe(this.game, 0, 440, 1);
  this.add(this.bottomPipe);

  this.hasScored = false;

  // this.topPipe.body.velocity.x = -200;
  // this.bottomPipe.body.velocity.x = -200;
  
  this.setAll('body.velocity.x', -200);

};

PipeGroup.prototype = Object.create(Phaser.Group.prototype);
PipeGroup.prototype.constructor = PipeGroup;

PipeGroup.prototype.update = function() {
  
	this.checkWorldBounds();
  
};

PipeGroup.prototype.reset = function(x, y) {
	// Step 1
	this.topPipe.reset(0,0);

	// Step 2
	this.bottomPipe.reset(0,440);

	// Step 3
	this.x = x;
	this.y = y;

	// Step 4
	this.setAll('body.velocity.x', -200);

	// Step 5
	this.hasScored = false;

	// Step 6
	this.exists = true;
};

PipeGroup.prototype.checkWorldBounds = function() {
	if(!this.topPipe.inWorld) {
		this.exists = false;
	};
};

module.exports = PipeGroup;

},{"./pipe":4}],6:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],7:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '40px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,200, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    // this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Lose!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    // this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],8:[function(require,module,exports){

'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    this.background = this.game.add.sprite(0,0, 'background');

    this.ground = this.game.add.tileSprite(0,400,335,112, 'ground');
    this.ground.autoScroll(-200, 0);

    // Set up a title group with title and bird
    this.titleGroup = this.game.add.group();

    // Create the title sprite and add it to the group
    this.title = this.game.add.sprite(0,0,'title');
    this.titleGroup.add(this.title);

    // Create the bird sprite and add it to the title group
    this.bird = this.game.add.sprite(200,5, 'bird');
    this.titleGroup.add(this.bird);

    // Add animation to the bird and begin
    this.bird.animations.add('flap');
    this.bird.animations.play('flap', 12, true);

    // Set up the originating location of the group
    this.titleGroup.x = 30;
    this.titleGroup.y= 100;

    // Create oscillating tween for title group to move it up and down
    this.game.add.tween(this.titleGroup).to({y:115}, 350, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

    this.startButton = this.game.add.button(this.game.width/2, 300, 'startButton', this.startClick, this);
    this.startButton.anchor.setTo(0.5, 0.5);


  },

  startClick: function() {
    this.game.state.start('play');
  },

  update: function() {

  }
};

module.exports = Menu;

},{}],9:[function(require,module,exports){

  'use strict';


  var PipeGroup = require('../prefabs/pipeGroup');
  var Bird = require('../prefabs/bird');
  var Ground = require('../prefabs/ground');

  function Play() {}
  Play.prototype = {
    create: function() {

      // ENABLING PHYSICS FOR GAME
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      // Setting global gravity for the game
      this.game.physics.arcade.gravity.y = 1200;

      this.background = this.game.add.sprite(0,0, 'background');

      // Create new bird object
      this.bird = new Bird(this.game, 100, this.game.height/2);
      // and add it to the game
      this.game.add.existing(this.bird);

      // create and add a group to hold our pipeGroup prefabs
      this.pipes = this.game.add.group()

      // Ground object creation and adding
      this.ground = new Ground(this.game, 0, 400, 335, 112);
      this.game.add.existing(this.ground);

      // add a timer for obstacle generation
      this.pipeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.25, this.generatePipes, this);
      this.pipeGenerator.timer.start();

      // this.instructionGroup = this.game.add.group();
      // this.instructionGroup.add(this.game.add.sprite(this.game.width/2, 100, 'getReady'));
      // this.instructionGroup.add(this.game.add.sprite(this.game.width/2, 325, 'instructions'));
      // this.instructionGroup.setAll('anchor.x', 0.5);
      // this.instructionGroup.setAll('anchor.y', 0.5);

    },
    update: function() {
      this.game.physics.arcade.collide(this.bird, this.ground, this.deathHandler, null, this);

      // this.game.physics.arcade.collide(this.bird, this.topPipe);
      this.pipes.forEach(function(pipeGroup){
        // console.log(this);
        this.game.physics.arcade.collide(this.bird, pipeGroup, this.deathHandler, null, this);
      }, this)

      // keep the spacebar from affecting the browser
      this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

      // add keyboard controls
      var flapKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      flapKey.onDown.add(this.bird.flap, this.bird);

      // And mouse/touch controls
      this.input.onDown.add(this.bird.flap, this.bird);

    },

    generatePipes: function() {
      console.log("Pipe time");
      var pipeY = this.game.rnd.integerInRange(-100, 100);
      var pipeGroup = this.pipes.getFirstExists(false);
      if(!pipeGroup) {
        pipeGroup = new PipeGroup(this.game, this.pipes)
      }
      pipeGroup.reset(this.game.width + pipeGroup.topPipe.width/2, pipeY);
    },

    deathHandler: function() {
      this.game.state.start('gameover');
    },

    shutdown: function() {
      console.log(this);
      this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
      this.bird.destroy();
      this.pipes.destroy();
    }
  };
  
  module.exports = Play;
},{"../prefabs/bird":2,"../prefabs/ground":3,"../prefabs/pipeGroup":5}],10:[function(require,module,exports){

'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    

    // Load our sprites
    this.load.image('background', 'assets/background.png');
    this.load.image('ground', 'assets/ground.png');
    this.load.image('title', 'assets/title.png');
    this.load.image('startButton', 'assets/start-button.png');

    this.load.spritesheet('bird', 'assets/bird.png', 34, 24, 3);

    this.load.spritesheet('pipe', 'assets/pipes.png', 54, 320, 2);

    this.load.image('instructions', 'assets/instructions.png');
    this.load.image('getReady', 'assets/get-ready.png');

  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

},{}]},{},[1])