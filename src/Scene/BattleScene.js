import Phaser from 'phaser';
import { postScores } from '../API/Scores';

let userName;
let finalScore;
class BattleScene extends Phaser.Scene {
  constructor() {
    super('BattleScene');
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });

    const tiles = map.addTilesetImage('spritesheet', 'tiles');

    map.createLayer('Grass', tiles, 0, 0);
    const obstacles = map.createLayer('Obstacles', tiles, 0, 0);

    obstacles.setCollisionByExclusion([-1]);

    this.player = this.physics.add.sprite(50, 100, 'player', 4).setScale(0.5);
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true;

    const defaultAnimationFrames = [1, 2, 3, 4, 5, 6];
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { frames: defaultAnimationFrames }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { frames: defaultAnimationFrames }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', { frames: defaultAnimationFrames }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', { frames: defaultAnimationFrames }),
      frameRate: 10,
      repeat: -1,
    });
    this.cursors = this.input.keyboard.createCursorKeys();

    // don't walk on trees
    this.physics.add.collider(this.player, obstacles);

    // where the enemies will be
    this.spawns = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
    for (let i = 0; i < 30; i += 1) {
      const x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      const y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
      // parameters are x, y, width, height
      this.spawns.create(x, y, 20, 20);
    }
    this.physics.add.overlap(this.player, this.spawns, this.dangerZones, false, this);

    this.gameitems = this.physics.add.group();

    for (let i = 0; i < 20; i += 1) {
      const x = Phaser.Math.RND.between(0, 800);
      const y = Phaser.Math.RND.between(0, 300);

      this.gameitems.create(x, y, 'star').setScale(0.5);
    }

    this.score = 0;
    this.scoreText = this.add.text(10, 7, 'Score: 0', {
      fontSize: '12px',
      fill: '#000',
    }).setDepth(3);

    this.physics.add.overlap(this.player, this.gameitems, this.collectStar, null, this);

    this.physics.add.collider(this.gameitems, obstacles);
    // eslint-disable-next-line no-alert
    userName = prompt('Enter your name!');
    finalScore = this.add.text(26, 50, 'finalScore', { fontSize: '20px', fill: '#9f1239' });
    finalScore.visible = false;
  }

  update() {
    this.scoreText.setScrollFactor(0, 0);
    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.player.anims.play('left', true);
      this.player.body.setVelocityX(-80);
    } else if (this.cursors.right.isDown) {
      this.player.anims.play('right', true);
      this.player.body.setVelocityX(80);
    } else if (this.cursors.up.isDown) {
      this.player.anims.play('up', true);
      this.player.body.setVelocityY(-80);
    } else if (this.cursors.down.isDown) {
      this.player.anims.play('down', true);
      this.player.body.setVelocityY(80);
    } else {
      this.player.anims.stop();
      this.player.body.setVelocity(0);
    }
  }

  dangerZones(player, zone) {
    // bomb Zone
    zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

    this.add.text(80, 120, 'GAME OVER!!', {
      fontSize: '30px',
      fill: '#FF0000',
    }).setDepth(5);

    this.endGame(player, this.score);
  }

  collectStar(player, star) {
    star.disableBody(true, true);
    this.score += 100;
    this.scoreText.setText(`Score: ${this.score}`);
    finalScore.setText(`${userName}, your core is: ${this.score}`);
    postScores(userName, this.score);
  }

  endGame(player) {
    this.cameras.main.shake(900);
    player.setTint(0xff0000);
    this.physics.pause();
    this.time.addEvent({
      delay: 3000,
      loop: false,
      callback: () => {
        this.scene.start('Title');
      },
    });
  }
}
export default BattleScene;