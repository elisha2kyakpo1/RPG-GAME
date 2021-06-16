import Phaser from 'phaser';
import Button from '../Buttons';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    this.gameButton = new Button(this, 225, 50, 'blueButton1', 'blueButton2', 'Play game', 'BattleScene');
    this.gameButton = new Button(this, 225, 100, 'blueButton1', 'blueButton2', 'Credits', 'CreditsScene');
    this.gameButton = new Button(this, 225, 150, 'blueButton1', 'blueButton2', 'Options', 'Options');
    this.gameButton = new Button(this, 225, 200, 'blueButton1', 'blueButton2', 'Scoreboard', 'Leaderboard');
  }
}