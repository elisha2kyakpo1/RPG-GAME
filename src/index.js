import Phaser from 'phaser';
import config from './Config/Config';
import { BattleScene, UIScene } from './Scene/BattleScene';
import WorldScene from './Scene/worldScene';
import BootScene from './Scene/BootScene';
import CreditsScene from './Scene/CreditsScene';
import TitleScene from './Scene/TitleScene';
import OptionsScene from './Scene/OptionsScene';
import LeaderboardScene from './Scene/LeaderBoard';
import Model from './Model';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('Options', OptionsScene);
    this.scene.add('WorldScene', WorldScene);
    this.scene.add('BattleScene', BattleScene);
    this.scene.add('BootScene', BootScene);
    this.scene.add('Preloader', UIScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('LeaderBoard', LeaderboardScene);

    this.scene.start('BootScene');
    const model = new Model();
    this.globals = { model, bgMusic: null };
  }
}

// eslint-disable-next-line no-new
window.Game = new Game();