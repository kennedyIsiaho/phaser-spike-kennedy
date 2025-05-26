
import BaseScene from './BaseScene';

export default class VillageScene extends BaseScene {
  constructor() {
    super({ key: 'VillageScene' });
    this.items = [
      { word: 'simba', imageKey: 'lion', soundSW: 'mtoto-sw', soundEN: 'mtoto-en' },
      { word: 'child', imageKey: 'mtoto', soundSW: 'mtoto-sw', soundEN: 'mtoto-en' }
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
    return 'ChildScene'; 
  }
}