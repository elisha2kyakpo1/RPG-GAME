import Phaser from 'phaser';
import Button from '../Buttons';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }

  create() {
    this.model = this.sys.game.globals.model;

    this.text = this.add.text(60, 50, 'Game Instructions', { fontSize: 20 });
    this.soundText = this.add.text(60, 100, 'Use Arrow keys on your key board to play', { fontSize: 16 });
    this.soundText = this.add.text(60, 120, 'the game!', { fontSize: 16 });

    this.menuButton = new Button(this, 100, 150, 'blueButton1', 'blueButton2', 'Menu', 'Title');
  }
}