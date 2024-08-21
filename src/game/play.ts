import { Level } from './level';
import { Hero } from './hero';
import { Enemy } from './enemy';
import { Animations } from './animations';

const LEVEL_COUNT = 2;

export class Play extends Phaser.Scene {
  currentLevel: integer = 1;
  level!: Level;
  hero!: Hero;
  key: any;
  door: any;
  keyIcon: any;
  coinIcon: any;
  enemies!: Enemy[];

  groups!: { [key: string]: Phaser.Physics.Arcade.Group };

  scoreText!: Phaser.GameObjects.BitmapText;

  score: integer = 0;
  hasKey: boolean = false;

  animations!: Animations;

  constructor() {
    super('Play');
  }

  create() {
    console.log('Play.create()');
    this.initAnimations();
    this.initLevel();
    this.initCamera();
    this.initPhysics();
    this.initScore();
  }

  update() {
    this.hero.update();
    this.enemies.forEach((enemy) => enemy.update());

    const frame = this.hasKey ? 1 : 0;
    this.keyIcon.setFrame(frame);
  }

  initAnimations() {
    this.animations = new Animations(this);
  }

  initLevel() {
    this.level = new Level(this);

    this.gotoLevel(this.currentLevel);

    const props: any = [
      'hero',
      'key',
      'keyIcon',
      'coinIcon',
      'door',
      'enemies',
      'groups',
    ];

    props.forEach((prop: any) => (this[prop] = this.level[prop]));
  }

  initCamera() {
    this.cameras.main.setBounds(0, 0, 960, 600);
    this.cameras.main.flash();
  }

  initPhysics() {
    this.physics.add.collider(this.hero, this.level.platforms);
    this.physics.add.collider(this.groups.enemies, this.level.platforms);
    this.physics.add.collider(this.groups.enemies, this.groups.enemyWalls);

    this.physics.add.overlap(
      this.hero,
      this.groups.coins,
      this.collectCoin,
      undefined,
      this
    );

    this.physics.add.overlap(
      this.hero,
      this.groups.enemies,
      this.doBattle,
      undefined,
      this
    );

    this.physics.add.overlap(
      this.hero,
      this.key,
      this.collectKey,
      undefined,
      this
    );

    this.physics.add.overlap(
      this.hero,
      this.door,
      this.exitThroughDoor,
      (hero: any) => this.hasKey && hero.body.touching.down,
      this
    );
  }

  initScore() {
    this.scoreText = this.add.bitmapText(
      this.coinIcon.x + this.coinIcon.width + 5,
      15,
      'font:numbers',
      `X${this.score}`
    );
  }

  getAnimations(key: string) {
    return this.animations.getAnimations(key);
  }

  doBattle(hero: any, enemy: any) {
    if (enemy.body.touching.up && hero.body.touching.down) {
      this.sound.play('sfx:stomp');
      enemy.die();
    } else {
      this.gameOver();
    }
  }

  exitThroughDoor(hero: any, door: any) {
    this.sound.play('sfx:door');
    this.gotoNextLevel();
  }

  collectKey(hero: any, key: any) {
    key.destroy();
    this.sound.play('sfx:key');
    this.hasKey = true;
  }

  collectCoin(hero: any, coin: any) {
    coin.destroy();
    this.sound.play('sfx:coin');
    this.score += 1;
    this.scoreText.text = `X${this.score}`;
  }

  reset() {
    this.score = 0;
    this.hasKey = false;
  }

  gotoNextLevel() {
    this.reset();
    this.currentLevel =
      this.currentLevel < LEVEL_COUNT ? ++this.currentLevel : 1;

    this.cameras.main.fade(1000);
    this.cameras.main.on('camerafadeoutcomplete', () => {
      this.scene.start('Play');
      this.gotoLevel(this.currentLevel);
    });
  }

  gotoLevel(level: any) {
    this.level.loadLevel(this.cache.json.get(`level:${level}`));
  }

  gameOver() {
    this.hero.die();
    setTimeout(() => {
      this.cameras.main.fade(500);
      this.cameras.main.on('camerafadeoutcomplete', () => {
        this.scene.restart();
      });
    }, 1000);
    this.reset();
  }
}
