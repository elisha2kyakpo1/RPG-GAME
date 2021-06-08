import Phaser from 'phaser';
import UiScene from './UiScene';
import BootScene from './Scene/BootScene';
import BattleScene from './BattleScene';
// import UiScene from './UiScene';

const config = {
  type: Phaser.AUTO,
  parent: 'content',
  width: 320,
  height: 240,
  zoom: 2,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: [
    BootScene,
    BattleScene,
    UiScene,
  ],
};

// eslint-disable-next-line no-new
new Phaser.Game(config);