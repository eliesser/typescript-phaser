import { Play } from './play';

export class Hero extends Phaser.Physics.Arcade.Sprite {
  keys!: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
  animations: any;
  dead = false;

  constructor(scene: Play, x: any, y: any) {
    super(scene, x, y, 'hero');
    this.animations = scene.getAnimations('hero');
    this.setOrigin(1, 1);
    this.initKeys(scene);
  }

  update() {
    if (this.dead) {
      this.halt();
      return; // Hero is dead... do nothing
    }

    if (this.keys?.up.isDown && this.body?.touching.down) {
      this.jump();
    } else if (this.keys?.left.isDown) {
      this.runLeft();
    } else if (this.keys?.right.isDown) {
      this.runRight();
    } else {
      this.halt();
    }

    let animationName = this.getAnimationName();
    if (this.anims.getName() !== animationName) {
      this.anims.play(animationName);
    }
  }

  die() {
    this.dead = true;
    this.anims.play('dyingHero', true);
  }

  runRight() {
    this.setVelocityX(160);
    this.setOffset(20, 20);
    this.flipX = false;
  }

  runLeft() {
    this.setVelocityX(-160);
    this.setOffset(40, 20);
    this.flipX = true;
  }

  halt() {
    this.setVelocityX(0);
  }

  jump() {
    this.setVelocityY(-370);
    this.scene.sound.play('sfx:jump');
  }

  getAnimationName() {
    let name = this.animations.stop; // default animation

    if (this.body && this.body.velocity.y > 0) {
      name = this.animations.jump;
    } else if (
      this.body &&
      this.body.velocity.y <= 0 &&
      !this.body.touching.down
    ) {
      name = this.animations.fall;
    } else if (
      this.body &&
      this.body.velocity.x !== 0 &&
      this.body.touching.down
    ) {
      name = this.animations.run;
    }

    return name;
  }

  private initKeys(scene: Play) {
    this.keys = scene.input.keyboard?.createCursorKeys();
  }
}
