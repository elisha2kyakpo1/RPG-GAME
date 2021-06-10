import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,
  parent: 'content',
  width: 550,
  height: 340,
  zoom: 2,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true, // set to true to view zones
    },
  },
};

export default config;