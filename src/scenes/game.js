import Phaser from 'phaser'

export default class GameScene extends Phaser.Scene {
  init (params) {
  }

  create () {
    this.add.image(640, 360, 'background')

    this.white = this.add.image(100, 100, 'white')
    this.white.setDisplaySize(120, 80)

    try {
      this.boy = this.add.spine(200, 650, 'spineboy')
    } catch(e) {
      console.log('couldnt add spineboy:', e)
    }
  }

  update (time, delta) {
    this.white.setPosition(Math.sin(time / 1200.0) * 100 + 640, Math.cos(time / 1100.0) * 110 + 360)
  }
}
