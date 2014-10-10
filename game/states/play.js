
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