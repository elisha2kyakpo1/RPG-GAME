import Phaser from 'phaser';
import scoreBoard from '../API/Scores';
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
    this.add.text(100, 50, 'ScoreBoard', { fontSize: '40px' });
    this.scores = await scoreBoard();
    this.topScores = topScores(this.scores.result);

    this.add.text(100, 100, `1) ${this.topScores[3].user} - ${this.topScores[3].score}`, { fontSize: '20px' });
    this.add.text(100, 130, `2) ${this.topScores[1].user} - ${this.topScores[1].score}`, { fontSize: '20px' });
    this.add.text(100, 160, `3) ${this.topScores[2].user} - ${this.topScores[2].score}`, { fontSize: '20px' });

    this.homeButton = new Button(this, 150, 250, 'blueButton1', 'blueButton2', 'Home', 'Title');
  }
}