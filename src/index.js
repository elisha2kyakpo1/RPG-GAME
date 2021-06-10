import Phaser from 'phaser';
import { BattleScene, UIScene } from './Scene/BattleScene';
import WorldScene from './Scene/worldScene';
import BootScene from './Scene/BootScene';
import CreditsScene from './Scene/CreditsScene';
import TitleScene from './Scene/TitleScene';
import OptionsScene from './Scene/OptionsScene';
import LeaderboardScene from './Scene/LeaderBoard';
import Button from './Buttons';

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
    Button,
    LeaderboardScene,
    OptionsScene,
    TitleScene,
    CreditsScene,
    BootScene,
    WorldScene,
    BattleScene,
    UIScene,
  ],
};

// eslint-disable-next-line no-new
new Phaser.Game(config);