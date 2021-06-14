import Phaser from 'phaser';
import Button from '../Buttons';
// import topScores from '../GameScores/TopScores';
// import scoresBoard from '../API/Scores';

export default class LeaderboardScene extends Phaser.Scene {
  init(data) {
    this.score = data.score;
  }

  constructor() {
    super('Leaderboard');
  }

  create() {
    this.add.text(180, 50, 'Leaderboard', { fontSize: '20px' });
    const MyGameId = 'Zl4d7IVkemOTTVg2fUdz';
    const baseURL = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${MyGameId}/scores/`;
    fetch(baseURL)
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
          this.add.text(100, 100, `1) ${item.user} - ${item.score}`, { fontSize: '20px' });
          this.add.text(100, 120, `2) ${item.user} - ${item.score}`, { fontSize: '20px' });
          this.add.text(100, 140, `3) ${item.user} - ${item.score}`, { fontSize: '20px' });
          this.add.text(100, 160, `4) ${item.user} - ${item.score}`, { fontSize: '20px' });
          this.add.text(100, 180, `5) ${item.user} - ${item.score}`, { fontSize: '20px' });
        });
      });
    this.menuButton = new Button(this, 160, 240, 'blueButton1', 'blueButton2', 'Menu', 'Title');
  }
}