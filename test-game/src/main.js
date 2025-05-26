
/*import Phaser from 'phaser';
import VillageScene from './scenes/VillageScene';
import ChildScene from './scenes/ChildScene';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#ffffff',
  parent: 'game-container',
  scene: [VillageScene, ChildScene],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 0,
        x: 0
      },
      debug: false
    }
  }
};

new Phaser.Game(config);*/

// game-config.ts
import Phaser from 'phaser';
import VillageScene from './scenes/VillageScene';
import ChildScene from './scenes/ChildScene';


const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#ffffff',
  scene: [VillageScene, ChildScene],
  physics: {
    default: 'arcade',
    arcade: { debug: false }
  }
};


export default new Phaser.Game(config);