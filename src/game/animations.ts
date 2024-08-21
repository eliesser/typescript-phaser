export class Animations {
  map = {
    enemy: {
      crawl: 'crawl',
      dying: 'dyingEnemy',
    },
    hero: {
      stop: 'stop',
      run: 'run',
      jump: 'jump',
      fall: 'fall',
      dying: 'dyingHero',
    },
    elements: {
      rotate: 'rotate',
      ilumine: 'ilumine',
    },
  };

  constructor(scene: Phaser.Scene) {
    this.initAnimations(scene);
  }

  getAnimations(key: 'enemy' | 'hero' | 'elements') {
    return this.map[key];
  }

  initAnimations(scene: Phaser.Scene) {
    scene.anims.create({
      key: 'crawl',
      frames: scene.anims.generateFrameNumbers('enemy', {
        frames: [0, 1, 5, 6, 7],
      }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: 'dyingEnemy',
      frames: scene.anims.generateFrameNumbers('enemy', {
        frames: [6, 2, 2, 6, 6, 6, 2, 2, 6, 6, 6, 6],
      }),
      frameRate: 1,
      repeat: 0,
      hideOnComplete: true,
    });

    scene.anims.create({
      key: 'stop',
      frames: scene.anims.generateFrameNumbers('hero', { start: 0, end: 17 }),
      frameRate: 10,
      repeat: -1,
    });

    scene.anims.create({
      key: 'run',
      frames: scene.anims.generateFrameNumbers('hero-run', {
        start: 0,
        end: 23,
      }),
      frameRate: 15,
      repeat: -1,
    });

    scene.anims.create({
      key: 'jump',
      frames: scene.anims.generateFrameNumbers('hero-jump', {
        start: 7,
        end: 18,
      }),
      frameRate: 10,
      repeat: 0,
    });

    scene.anims.create({
      key: 'fall',
      frames: scene.anims.generateFrameNumbers('hero-jump', {
        start: 0,
        end: 6,
      }),
      frameRate: 10,
      repeat: 0,
    });

    scene.anims.create({
      key: 'dyingHero',
      frames: scene.anims.generateFrameNumbers('hero-die', {
        frames: [6, 5, 4, 3, 1, 2, 1],
      }),
      frameRate: 6,
      repeat: 0,
    });

    scene.anims.create({
      key: 'rotate',
      frames: scene.anims.generateFrameNumbers('coin', {
        frames: [0, 1, 2, 3, 4, 5, 6, 7],
      }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: 'ilumine',
      frames: scene.anims.generateFrameNumbers('key', {
        frames: [0, 1, 2, 3, 4],
      }),
      frameRate: 8,
      repeat: -1,
    });
  }
}
