import Phaser from 'phaser';
import BattleScene from './Scene/BattleScene';
import WorldScene from './Scene/worldScene';
import BootScene from './Scene/BootScene';
import UIScene from './Scene/UiScene';

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
      debug: false, // set to true to view zones
    },
  },
  scene: [
    BootScene,
    WorldScene,
    BattleScene,
    UIScene,
  ],
};

// eslint-disable-next-line no-new
new Phaser.Game(config);