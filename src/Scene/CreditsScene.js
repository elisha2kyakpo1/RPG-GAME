import Phaser from 'phaser';

const width = 800;
const height = 640;
const credits = `
Created by Elisha k,
A Microverse student!
`;
export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create() {
    this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#fff' });
    this.madeByText = this.add.text(0, 0, credits, { fontSize: '26px', fill: '#fff' });
    this.zone = this.add.zone(width / 2, height / 2, width, height);

    Phaser.Display.Align.In.Center(
      this.creditsText,
      this.zone,
    );

    Phaser.Display.Align.In.Center(
      this.madeByText,
      this.zone,
    );

    this.madeByText.setY(1000);

    this.creditsTween = this.tweens.add({
      targets: this.creditsText,
      y: -100,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
      onComplete: () => {
        // eslint-disable-next-line no-unused-expressions
        this.destroy;
      },
    });

    this.madeByTween = this.tweens.add({
      targets: this.madeByText,
      y: -300,
      ease: 'Power1',
      duration: 8000,
      delay: 1000,
      onComplete: () => {
        // eslint-disable-next-line no-unused-expressions
        this.madeByTween.destroy;
        this.scene.start('Title');
      },
    });
  }
}