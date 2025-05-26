import { describe, it, expect, vi, beforeEach } from 'vitest'
//const { describe, it, expect, vi, beforeEach } = require('vitest');

import BaseScene from '../scenes/BaseScene'

// Dummy subclass
class TestScene extends BaseScene {
  protected getNextSceneKey(): string {
    return 'NextScene'
  }
}

describe('BaseScene', () => {
  let scene: TestScene

  beforeEach(() => {
    scene = new TestScene('TestScene')

    const textMock = {
      setOrigin: vi.fn().mockReturnThis(),
      setStyle: vi.fn().mockReturnThis(),
      setPadding: vi.fn().mockReturnThis(),
      setStroke: vi.fn().mockReturnThis(),
      x: 100,
      y: 100
    }

    const imageMock = {
      setInteractive: vi.fn().mockReturnThis(),
      setScale: vi.fn().mockReturnThis(),
      setData: vi.fn().mockReturnThis(),
      setVisible: vi.fn().mockReturnThis(),
      setPosition: vi.fn().mockReturnThis(),
      x: 0,
      y: 0,
      visible: true,
      getData: vi.fn().mockImplementation((key: string) => {
        if (key === 'targetText') return textMock
        if (key === 'originalX') return 0
        if (key === 'originalY') return 0
        if (key === 'correctSoundSW') return 'mtoto-sw'
        if (key === 'correctSoundEN') return 'child-en'
      })
    }

    scene.add = {
      text: vi.fn().mockReturnValue(textMock),
      image: vi.fn().mockReturnValue(imageMock)
    } as any

    scene.input = {
      setDraggable: vi.fn(),
      on: vi.fn()
    } as any

    scene.sound = {
      play: vi.fn(),
      stopAll: vi.fn()
    } as any

    scene.time = {
      delayedCall: vi.fn()
    } as any

  
    (scene as any).items = [
      {
        word: 'mtoto',
        imageKey: 'child-image',
        soundSW: 'mtoto-sw',
        soundEN: 'child-en'
      }
    ]
  })

  it('should create draggable images and labels', () => {
    scene.createItems()

    expect(scene.add.text).toHaveBeenCalledWith(
      expect.any(Number),
      expect.any(Number),
      'mtoto',
      expect.any(Object)
    )

    expect(scene.add.image).toHaveBeenCalledWith(
      expect.any(Number),
      expect.any(Number),
      'child-image'
    )
  })
})
