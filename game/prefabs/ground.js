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
