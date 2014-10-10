
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
