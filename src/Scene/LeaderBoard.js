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
    this.add.text(180, 100, 'Leaderboard', { fontSize: '45px' });
    this.scores = await getScores();
    this.topScores = topScores(this.scores.result);

    this.add.text(100, 200, `1) ${this.topScores[3].user} - ${this.topScores[3].score}`, { fontSize: '32px' });
    this.add.text(100, 250, `2) ${this.topScores[1].user} - ${this.topScores[1].score}`, { fontSize: '32px' });
    this.add.text(100, 300, `3) ${this.topScores[2].user} - ${this.topScores[2].score}`, { fontSize: '32px' });

    this.homeButton = new Button(this, 320, 500, 'blueButton1', 'blueButton2', 'Home', 'Title');
  }
}