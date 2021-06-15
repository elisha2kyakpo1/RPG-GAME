import Phaser from 'phaser';
import { getScores } from '../API/Scores';
import Button from '../Buttons';
import topScores from '../GameScores/TopScores';

export default class LeaderboardScene extends Phaser.Scene {
  init(data) {
    this.score = data.score;
  }

  constructor() {
    super('Leaderboard');
  }

  async create() {
    this.add.text(100, 50, 'Leaderboard', { fontSize: '30px' });
    this.scores = await getScores();
    this.topScores = topScores(this.scores.result);

    this.add.text(100, 100, `1) ${this.topScores[1].user} - ${this.topScores[1].score}`, { fontSize: '20px' });
    this.add.text(100, 120, `2) ${this.topScores[2].user} - ${this.topScores[2].score}`, { fontSize: '20px' });
    this.add.text(100, 140, `3) ${this.topScores[3].user} - ${this.topScores[3].score}`, { fontSize: '20px' });
    this.add.text(100, 160, `4) ${this.topScores[4].user} - ${this.topScores[4].score}`, { fontSize: '20px' });
    this.add.text(100, 180, `5) ${this.topScores[5].user} - ${this.topScores[5].score}`, { fontSize: '20px' });
    this.add.text(100, 200, `6) ${this.topScores[6].user} - ${this.topScores[6].score}`, { fontSize: '20px' });

    this.homeButton = new Button(this, 100, 250, 'blueButton1', 'blueButton2', 'Home', 'Title');
  }
}