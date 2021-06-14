import Phaser from 'phaser';
import Button from '../Buttons';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Score');
  }

  create() {
    const board = document.getElementById('score');
    board.style.display = 'block';
    board.innerHTML = '';
    fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Zl4d7IVkemOTTVg2fUdz/scores/1')
      .then((res) => res.json())
      .then((res) => {
        const arr = res.result;
        for (let i = 0; i < arr.length; i += 1) {
          for (let j = 0; j < arr.length - 1; j += 1) {
            if (arr[j].score < arr[j + 1].score) {
              const tmp = arr[j];
              arr[j] = arr[j + 1];
              arr[j + 1] = tmp;
            }
          }
        }
        arr.slice(0, 5).forEach((item) => {
          const div = document.createElement('div');
          div.style.cssText = `
          display:flex;
          justify-content: space-between
          `;
          const nameDiv = document.createElement('strong');
          const scoreDiv = document.createElement('strong');
          nameDiv.innerHTML = `${item.user} `;
          scoreDiv.innerHTML = `${item.score}`;
          div.appendChild(nameDiv);
          div.appendChild(scoreDiv);
          board.appendChild(div);
        });
      });
    this.menuButton = new Button(this, 160, 200, 'btn-default', 'btn-hover', 'Menu', 'Title');
  }
}