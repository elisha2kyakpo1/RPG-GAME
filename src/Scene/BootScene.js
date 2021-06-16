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
    this.load.image('Logo', './assets/logo.png');

    this.load.tilemapTiledJSON('map', 'assets/map/map.json');
    this.load.image('star', 'assets/star.png');
    this.load.spritesheet('player', 'assets/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });
  },

  create() {
    // start the WorldScene
    this.scene.start('Preloader');
  },
});

export default BootScene;