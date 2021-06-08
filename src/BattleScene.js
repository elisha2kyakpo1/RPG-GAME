import Phaser from 'phaser';

export default class BattleScene extends Phaser.Scene {
  constructor() {
    super('BattleScene');
  }

  create() {
    // change the background to green
    this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');

    // player character - warrior
    const warrior = new PlayerCharacter(this, 250, 50, 'player', 1, 'Warrior', 100, 20);
    this.add.existing(warrior);

    // player character - mage
    const mage = new PlayerCharacter(this, 250, 100, 'player', 4, 'Mage', 80, 8);
    this.add.existing(mage);

    const dragonblue = new Enemy(this, 50, 50, 'dragonblue', null, 'Dragon', 50, 3);
    this.add.existing(dragonblue);

    const dragonOrange = new Enemy(this, 50, 100, 'dragonorrange', null, 'Dragon2', 50, 3);
    this.add.existing(dragonOrange);

    // array with heroes
    this.heroes = [warrior, mage];
    // array with enemies
    this.enemies = [dragonblue, dragonOrange];
    // array with both parties, who will attack
    this.units = this.heroes.concat(this.enemies);

    // Run UI Scene at the same time
    this.scene.launch('UIScene');

    this.index = -1;
  }

  nextTurn() {
    this.index += 1;
    // if there are no more units, we start again from the first one
    if (this.index >= this.units.length) {
      this.index = 0;
    }
    if (this.units[this.index]) {
    // if its player hero
      if (this.units[this.index] instanceof PlayerCharacter) {
        this.events.emit('PlayerSelect', this.index);
      } else { // else if its enemy unit
        // pick random hero
        const r = Math.floor(Math.random() * this.heroes.length);
        // call the enemy's attack function
        this.units[this.index].attack(this.heroes[r]);
        // add timer for the next turn, so will have smooth gameplay
        this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
      }
    }
  }

  // when the player have selected the enemy to be attacked
  receivePlayerSelection(action, target) {
    if (action === 'attack') {
      this.units[this.index].attack(this.enemies[target]);
    }
    // next turn in 3 seconds
    this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
  }
};

// base class for heroes and enemies
const Unit = new Phaser.Class({
  Extends: Phaser.GameObjects.Sprite,

  initialize:

    function Unit(scene, x, y, texture, frame, type, hp, damage) {
      Phaser.GameObjects.Sprite.call(this, scene, x, y, texture, frame);
      this.type = type;
      this.maxHp = this.hp = hp;
      this.damage = damage; // default damage
    },
  attack(target) {
    target.takeDamage(this.damage);
    this.scene.events.emit(`Message ${this.type} attacks ${target.type} for ${this.damage} damage`);
  },

  takeDamage(damage) {
    this.hp -= damage;
    if (this.hp <= 0) {
      this.hp = 0;
      this.alive = false;
    }
  },
});

const Enemy = new Phaser.Class({
  Extends: Unit,

  initialize:
    function Enemy(scene, x, y, texture, frame, type, hp, damage) {
      Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
    },
});

const PlayerCharacter = new Phaser.Class({
  Extends: Unit,

  initialize:
    function PlayerCharacter(scene, x, y, texture, frame, type, hp, damage) {
      Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
      // flip the image so I don't have to edit it manually
      this.flipX = true;

      this.setScale(2);
    },
});

const MenuItem = new Phaser.Class({
  Extends: Phaser.GameObjects.Text,

  initialize:

    function MenuItem(x, y, text, scene) {
      Phaser.GameObjects.Text.call(this, scene, x, y, text, { color: '#ffffff', align: 'left', fontSize: 15});
    },

  select() {
    this.setColor('#f8ff38');
  },

  deselect() {
    this.setColor('#ffffff');
  },

});

const Menu = new Phaser.Class({
  Extends: Phaser.GameObjects.Container,

  initialize:

    function Menu(x, y, scene, heroes) {
      Phaser.GameObjects.Container.call(this, scene, x, y);
      this.menuItems = [];
      this.menuItemIndex = 0;
      this.heroes = heroes;
      this.x = x;
      this.y = y;
    },

  addMenuItem(unit) {
    const menuItem = new MenuItem(0, this.menuItems.length * 20, unit, this.scene);
    this.menuItems.push(menuItem);
    this.add(menuItem);
  },
  moveSelectionUp() {
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex -= 1;
    if (this.menuItemIndex < 0) this.menuItemIndex = this.menuItems.length - 1;
    this.menuItems[this.menuItemIndex].select();
},
  moveSelectionDown() {
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex += 1;
    if (this.menuItemIndex >= this.menuItems.length) {
      this.menuItemIndex = 0;
    }
    this.menuItems[this.menuItemIndex].select();
  },
  // select the menu as a whole and an element with index from it
  select(index) {
    if (!index) {
      index = 0;
      this.menuItems[this.menuItemIndex].deselect();
      this.menuItemIndex = index;
      this.menuItems[this.menuItemIndex].select();
    }
  },
  // deselect this menu
  deselect() {
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex = 0;
  },

  confirm() {
    // wen the player confirms his slection, do the action
  },

  clear() {
    for (let i = 0; i < this.menuItems.length; i += 1) {
      this.menuItems[i].destroy();
    }
    this.menuItems.length = 0;
    this.menuItemIndex = 0;
  },
  remap(units) {
    this.clear();
    for (let i = 0; i < units.length; i += 1) {
      const unit = units[i];
      this.addMenuItem(unit.type);
    }
  },
});

const Message = new Phaser.Class({

  Extends: Phaser.GameObjects.Container,

  initialize:
    function Message(scene, events) {
      Phaser.GameObjects.Container.call(this, scene, 160, 30);
      const graphics = this.scene.add.graphics();
      this.add(graphics);
      graphics.lineStyle(1, 0xffffff, 0.8);
      graphics.fillStyle(0x031f4c, 0.3);
      graphics.strokeRect(-90, -15, 180, 30);
      graphics.fillRect(-90, -15, 180, 30);
      this.text = new Phaser.GameObjects.Text(scene, 0, 0, '', {
        color: '#ffffff', align: 'center', fontSize: 13, wordWrap: { width: 160, useAdvancedWrap: true },
      });
      this.add(this.text);
      this.text.setOrigin(0.5);
      events.on('Message', this.showMessage, this);
      this.visible = false;
    },

  showMessage(text) {
    this.text.setText(text);
    this.visible = true;
    if (this.hideEvent) {
      this.hideEvent.remove(false);
      this.hideEvent = this.scene.time.addEvent({
        delay: 2000, callback: this.hideMessage, callbackScope: this,
      });
    }
  },

  hideMessage() {
    this.hideEvent = null;
    this.visible = false;
  },
});
