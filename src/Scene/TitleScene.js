import Phaser from 'phaser';
import Button from '../Buttons';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    // this.model = this.sys.game.globals.model;
    // if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
    //   this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
    //   this.bgMusic.play();
    //   this.model.bgMusicPlaying = true;
    //   this.sys.game.globals.bgMusic = this.bgMusic;
    // }
    this.gameButton = new Button(this, 225, 50, 'blueButton1', 'blueButton2', 'Play game', 'BattleScene');
    this.gameButton = new Button(this, 225, 100, 'blueButton1', 'blueButton2', 'Credits', 'CreditsScene');
    this.gameButton = new Button(this, 225, 150, 'blueButton1', 'blueButton2', 'Options', 'Options');
    this.gameButton = new Button(this, 225, 200, 'blueButton1', 'blueButton2', 'Scoreboard', 'Leaderboard');
  }
}