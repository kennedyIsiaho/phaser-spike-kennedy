// base-scene.ts
import Phaser from 'phaser';

export default abstract class BaseItemScene extends Phaser.Scene {
  public draggableImages: Phaser.GameObjects.Image[] = [];
  protected abstract getNextSceneKey(): string;
  public items!: GameItem[];
  protected columns: number = 3;
  protected itemSpacingX: number = 150;
  protected itemSpacingY: number = 200;
  protected startX: number = 150;
  protected startY: number = 200;

  public createItems(): void {
    this.items.forEach((item, index) => {
        const x = this.startX + (index % this.columns) * this.itemSpacingX;
        const y = this.startY + Math.floor(index / this.columns) * this.itemSpacingY;
        const text = this.createTextLabel(x, y - 100, item.word);
        this.createDraggableImage(x, y, item, text); 
      });


    this.setupDragHandlers();
  }

  private createTextLabel(x: number, y: number, text: string): Phaser.GameObjects.Text {
    return this.add.text(x, y, text, {
      fontSize: '48px',
      fontFamily: 'Short Stack',
      color: '#2d2d2d',
      stroke: '#ffffff',
      strokeThickness: 4,
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5);
  }
  private createDraggableImage(x: number, y: number, item: GameItem, text: Phaser.GameObjects.Text): void {
    const image = this.add.image(x, y, item.imageKey)
      .setInteractive() 
      .setScale(0.05)
      .setData({
        targetText: text,
        originalX: x,
        originalY: y,
        correctSoundSW: item.soundSW,
        correctSoundEN: item.soundEN
      });
  
      this.draggableImages.push(image);
      this.input.setDraggable(image); 
  }

  protected setupDragHandlers(): void {
    // Add these missing handlers
    this.input.on('dragstart', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) => {
      gameObject.setScale(0.08).setDepth(1); 
    });
  
    this.input.on('drag', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image, dragX: number, dragY: number) => {
      gameObject.x = dragX; 
      gameObject.y = dragY;
    });
  
    this.input.on('dragend', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image) => {
      const text = gameObject.getData('targetText') as Phaser.GameObjects.Text;
      const originalX = gameObject.getData('originalX') as number;
      const originalY = gameObject.getData('originalY') as number;
      const correctSoundSW = gameObject.getData('correctSoundSW') as string;
      const correctSoundEN = gameObject.getData('correctSoundEN') as string;
  
      
      gameObject.setScale(0.05);
  
      if (Phaser.Math.Distance.Between(gameObject.x, gameObject.y, text.x, text.y) < 100) {
        this.sound.play(correctSoundSW);
        this.time.delayedCall(1000, () => this.sound.play(correctSoundEN));
        gameObject.setVisible(false);

        if (this.draggableImages.every(img => !img.visible)) {
            this.time.delayedCall(2000, () => {
              this.scene.start(this.getNextSceneKey());
              this.sound.stopAll();
            });
          }

      } else {
        gameObject.setPosition(originalX, originalY);
      }
    });
    
  }
}

interface GameItem {
  word: string;
  imageKey: string;
  soundSW: string;
  soundEN: string;
}