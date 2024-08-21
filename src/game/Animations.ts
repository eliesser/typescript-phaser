export class Animations {
  map = {
    spider: {
      crawl: 'crawl',
      dying: 'dyingSpider',
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
    },
  };

  constructor(scene: Phaser.Scene) {
    this.initAnimations(scene);
  }

  getAnimations(key: 'spider' | 'hero' | 'elements') {
    return this.map[key];
  }

  initAnimations(scene: Phaser.Scene) {
    scene.anims.create({
      key: 'crawl',
      frames: scene.anims.generateFrameNumbers('spider', {
        frames: [0, 1, 2],
      }),
      frameRate: 8,
      repeat: -1,
    });

    scene.anims.create({
      key: 'dyingSpider',
      frames: scene.anims.generateFrameNumbers('spider', {
        frames: [0, 4, 0, 4, 0, 4, 3, 3, 3, 3, 3, 3],
      }),
      frameRate: 12,
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
      frames: scene.anims.generateFrameNumbers('hero', { start: 5, end: 6 }),
      frameRate: 12,
      repeat: 4,
    });

    scene.anims.create({
      key: 'rotate',
      frames: scene.anims.generateFrameNumbers('coin', {
        frames: [0, 1, 2, 1],
      }),
      frameRate: 6,
      repeat: -1,
    });
  }
}
