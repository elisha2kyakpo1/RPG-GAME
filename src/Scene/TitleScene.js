import Phaser from 'phaser';
import Button from '../Buttons';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
    this.gameButton = new Button(this, 160, 200, 'btn-default', 'btn-hover', 'Credits', 'Credits');
    this.gameButton = new Button(this, 160, 50, 'btn-default', 'btn-hover', 'Play', 'Game');
    this.gameButton = new Button(this, 160, 100, 'btn-default', 'btn-hover', 'Options', 'Options');
    this.gameButton = new Button(this, 160, 150, 'btn-default', 'btn-hover', 'Scoreboard', 'LeaderBoard');
  }
}