

import BaseScene from './BaseScene';

export default class ChildScene extends BaseScene {
  constructor() {
    super({ key: 'ChildScene' });
    this.items = [
      { word: 'Kijiji', imageKey: 'village', soundSW: 'mtoto-sw', soundEN: 'mtoto-en' },
      { word: 'gari', imageKey: 'car', soundSW: 'mtoto-sw', soundEN: 'car-en' }
    ];

    this.columns = 2; 
    this.itemSpacingX = 500; 
  }

  preload() {
    this.items.forEach(item => {
      this.load.image(item.imageKey, `assets/images/${item.imageKey}.png`);
      this.load.audio(item.soundSW, `assets/audio/${item.soundSW}.mp3`);
      this.load.audio(item.soundEN, `assets/audio/${item.soundEN}.mp3`);
    });
  }

  create() {
    this.createItems();
    
  }

  protected getNextSceneKey(): string {
    return 'VillageScene'; 
  }
}