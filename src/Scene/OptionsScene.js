import Phaser from 'phaser';
import Button from '../Buttons';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }

  create() {
    this.model = this.sys.game.globals.model;

    this.text = this.add.text(270, 30, 'Options', { fontSize: 20 });
    this.musicButton = this.add.image(250, 100, 'checkedBox').setScale(0.5);
    this.musicText = this.add.text(270, 90, 'Music Enabled', { fontSize: 16 });

    this.soundButton = this.add.image(250, 135, 'checkedBox').setScale(0.5);
    this.soundText = this.add.text(270, 125, 'Sound Enabled', { fontSize: 16 });

    this.musicButton.setInteractive();
    this.soundButton.setInteractive();

    this.musicButton.on('pointerdown', () => {
      this.model.musicOn = !this.model.musicOn;
      // this.updateAudio();
    });

    this.soundButton.on('pointerdown', () => {
      this.model.soundOn = !this.model.soundOn;
      // this.updateAudio();
    });
    // this.updateAudio();

    this.gameButton = new Button(this, 270, 200, 'blueButton1', 'blueButton2', 'Menu', 'Title');
  }

  updateAudio() {
    if (this.model.musicOn === false) {
      this.musicButton.setTexture('box');
      this.sys.game.globals.bgMusic.stop();
      this.model.bgMusicPlaying = false;
    } else {
      this.musicButton.setTexture('checkedBox');
      if (this.model.bgMusicPlaying === false) {
        this.sys.game.globals.bgMusic.play();
        this.model.bgMusicPlaying = true;
      }
    }

    if (this.model.soundOn === false) {
      this.soundButton.setTexture('box');
    } else {
      this.soundButton.setTexture('checkedBox');
    }
  }
}