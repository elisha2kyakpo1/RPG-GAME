import Phaser from 'phaser';
import { postScores } from '../API/Scores';

export default class InputScene extends Phaser.Scene {
  init(data) {
    this.score = data;
  }

  constructor() {
    super('Input');
  }

  create() {
    let name = '';

    const submitInfo = () => {
      const test = document.createElement('p');
      name = document.getElementById('name').value;
      if (name.length >= 5) {
        const result = postScores(name, this.score);
        result.then(() => {
          this.scene.start('Title');
        }).catch(() => {
          this.add.text(100, 200, 'Sorry! Something went wrong :( ', {
            fontSize: '20px',
            fill: '#9f1239',
          });
        });
      } else {
        test.innerText = 'Name is too short';
        this.add.dom(100, 100, test);
      }
    };
    this.add.image(400, 300, 'background');
    const inputText = document.createElement('input');
    inputText.type = 'text';
    inputText.id = 'name';
    this.add.dom(200, 50, inputText);

    const text = document.createElement('p');
    text.innerText = 'Provide your Username press Enter and Wait to Submit';
    text.id = 'text';
    this.add.dom(200, 150, text);
    this.input.keyboard.on('keydown-ENTER', submitInfo, this);
  }
}