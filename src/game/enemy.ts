import { Play } from './play';

const SPIDER_SPEED = 100;
const enum Directions {
  left = 'left',
  right = 'right',
}

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  direction = Directions.right;
  dead = false;
  animations: any;

  constructor(scene: Play, x: any, y: any) {
    super(scene, x, y, 'enemy');

    this.animations = scene.getAnimations('enemy');

    this.setOrigin(0.5, 0.5);
  }

  update() {
    if (!this.dead) {
      this.live();
    }
  }

  die() {
    this.dead = true;
    this.disableBody();
    this.anims.play(this.animations.dying, true);
  }

  live() {
    if (this.body?.touching.right || this.body?.blocked.right) {
      this.direction = Directions.left;
    } else if (this.body?.touching.left || this.body?.blocked.left) {
      this.direction = Directions.right;
    }
    this.crawl(this.direction);
  }

  crawl(direction: any) {
    const velocity = this.getVelocity(direction);
    velocity < 0 ? (this.flipX = true) : (this.flipX = false);
    this.setVelocityX(velocity);
    this.anims.play(this.animations.crawl, true);
  }

  private getVelocity(direction: any) {
    return direction === Directions.left ? -SPIDER_SPEED : SPIDER_SPEED;
  }
}