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
