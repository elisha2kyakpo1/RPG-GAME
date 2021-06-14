import Phaser from 'phaser';
import scoreBoard from './API/Scores';

export default class InputScene extends Phaser.Scene {
  constructor() {
    super('Input');
  }

  create() {
    this.add.image(150, 80, 'logo').setScale(0.2);
    const element = document.getElementById('form');
    // element.style.display = 'flex';
    element.addEventListener('click', (event) => {
      if (event.target.name === 'submit') {
        const user = document.getElementById('user');
        if (user.value !== '') {
          element.style.display = 'none';
          scoreBoard.names(user.value);
          scoreBoard.postScores();
          this.scene.start('Title');
        } else {
          const element = document.getElementById('error');
          element.style.display = 'none';
          element.innerHTML = '';
          const p = document.createElement('p');
          p.textContent = 'Enter a valid name please';
          element.appendChild(p);
        }
      }
    });
  }
}