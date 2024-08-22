import level1 from '../data/level1.json';
import level2 from '../data/level2.json';

export class Boot extends Phaser.Scene {
  music!:
    | Phaser.Sound.NoAudioSound
    | Phaser.Sound.HTML5AudioSound
    | Phaser.Sound.WebAudioSound;

  constructor() {
    super('Boot');
  }

  preload() {
    console.log('Boot.preload()');

    this.load.json('level:1', level1);
    this.load.json('level:2', level2);

    this.load.image('font:numbers', 'src/assets/images/numbers.png');
    this.load.image('icon:coin', 'src/assets/images/coin_icon.png');
    this.load.image('background', 'src/assets/images/background.png');
    this.load.image('invisible-wall', 'src/assets/images/invisible_wall.png');
    this.load.image('ground', 'src/assets/images/ground.png');
    this.load.image('grass:8x1', 'src/assets/images/grass_8x1.png');
    this.load.image('grass:6x1', 'src/assets/images/grass_6x1.png');
    this.load.image('grass:4x1', 'src/assets/images/grass_4x1.png');
    this.load.image('grass:2x1', 'src/assets/images/grass_2x1.png');
    this.load.image('grass:1x1', 'src/assets/images/grass_1x1.png');

    this.load.spritesheet('key', 'src/assets/rocky-roads/objects/key.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('decoration', 'src/assets/images/decor.png', {
      frameWidth: 42,
      frameHeight: 42,
    });

    this.load.spritesheet(
      'hero',
      'src/assets/red-hood-pixel-character/idle.png',
      {
        frameWidth: 80,
        frameHeight: 80,
      }
    );

    this.load.spritesheet(
      'hero-run',
      'src/assets/red-hood-pixel-character/run.png',
      {
        frameWidth: 80,
        frameHeight: 80,
      }
    );

    this.load.spritesheet(
      'hero-jump',
      'src/assets/red-hood-pixel-character/jump.png',
      {
        frameWidth: 80,
        frameHeight: 80,
      }
    );

    this.load.spritesheet(
      'hero-die',
      'src/assets/red-hood-pixel-character/hurt.png',
      {
        frameWidth: 80,
        frameHeight: 80,
      }
    );

    this.load.spritesheet(
      'coin',
      'src/assets/rocky-roads/objects/coin_gold.png',
      {
        frameWidth: 16,
        frameHeight: 16,
      }
    );

    this.load.spritesheet(
      'enemy',
      'src/assets/rocky-roads/enemies/bear_brown.png',
      {
        frameWidth: 32,
        frameHeight: 32,
      }
    );

    this.load.spritesheet('door', 'src/assets/images/door.png', {
      frameWidth: 42,
      frameHeight: 66,
    });

    this.load.spritesheet('icon:key', 'src/assets/images/key_icon.png', {
      frameWidth: 34,
      frameHeight: 30,
    });

    this.load.audio('sfx:jump', 'src/assets/audio/jump.wav');
    this.load.audio('sfx:coin', 'src/assets/audio/coin.wav');
    this.load.audio('sfx:key', 'src/assets/audio/key.wav');
    this.load.audio('sfx:stomp', 'src/assets/audio/stomp.wav');
    this.load.audio('sfx:door', 'src/assets/audio/door.wav');
    this.load.audio('bgm', [
      'src/assets/audio/bgm.mp3',
      'src/assets/audio/bgm.ogg',
    ]);
  }

  create() {
    console.log('Boot.create()');
    this.scene.start('Play');
    this.music = this.sound.add('bgm');
    // this.music.play({ loop: true });
  }
}
