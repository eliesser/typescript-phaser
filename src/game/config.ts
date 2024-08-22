import { Boot } from './boot';
import { Play } from './play';

export var gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 960,
  height: 600,
  roundPixels: true,
  backgroundColor: 0x000000,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 500 },
      debug: true,
    },
  },
  scene: [Boot, Play],
};
