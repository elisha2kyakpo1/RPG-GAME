import Phaser from 'phaser';

const BootScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

    function BootScene() {
      Phaser.Scene.call(this, { key: 'BootScene' });
    },

  preload() {
    // map tiles
    this.load.image('tiles', 'assets/map/spritesheet.png');

    // map in json format
    this.load.tilemapTiledJSON('map', 'assets/map/map.json');

    // enemies
    this.load.image('star', 'assets/star.png');
    this.load.audio('bgMusic', ['assets/Sound/lobby.mp3']);
    this.load.audio('gameMusic', ['assets/Sound/Game.mp3']);
    this.load.audio('jump', ['assets/Sound/jump.wav']);
    this.load.audio('pickup', ['assets/Sound/pickup.wav']);
    // our two characters
    this.load.spritesheet('player', 'assets/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });
  },

  create() {
    // start the WorldScene
    this.scene.start('Preloader');
  },
});

export default BootScene;