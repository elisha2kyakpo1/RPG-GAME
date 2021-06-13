import Phaser from 'phaser';

const UserInput = Phaser.Class({
  Extends: Phaser.Scene,

  initialize:

    function BootScene() {
      Phaser.Scene.call(this, { key: 'Input' });
    },

  create() {
    const button = document.getElementsByClassName('.submitBtn');

    button.onclick = () => {
      const inputUsername = document.getElementsByClassName('user-input');
      const user = JSON.stringify(inputUsername.value);
      const div = document.getElementById('login');
      div.style.display = 'block';
      if (localStorage) {
        if (inputUsername.value !== '') {
          localStorage.clear();
          localStorage.setItem('user', user);
          div.removeChild(inputUsername);
          div.removeChild(button);
          div.classList += 'dnone';
          this.scene.start('Title');
        }
      }
    };
  },
});

export default UserInput;