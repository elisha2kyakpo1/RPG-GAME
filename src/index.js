import Phaser from 'phaser';
import { BattleScene, UIScene } from './Scene/BattleScene';
import WorldScene from './Scene/worldScene';
import BootScene from './Scene/BootScene';

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
  scene: [
    BootScene,
    WorldScene,
    BattleScene,
    UIScene,
  ],
};

// eslint-disable-next-line no-new
new Phaser.Game(config);