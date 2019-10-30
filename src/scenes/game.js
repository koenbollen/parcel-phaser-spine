import Phaser from 'phaser'

export default class GameScene extends Phaser.Scene {
  init (params) {
  }

  create () {
    this.add.image(640, 360, 'background')

    this.white = this.add.image(100, 100, 'white')
    this.white.setDisplaySize(120, 80)

    this.jelly = this.add.spine(200, 650, 'jelly', 'jelly-idle', true).setSkinByName('trapeze_Purple')
    this.jelly.setAttachment('hat', 'images/La9')

    this.first = true
  }

  update (time, delta) {
    if (this.first) {
      console.log('expecting 3 childern, got:', this.children.list.length)
      this.first = false
    }
    this.white.setPosition(Math.sin(time / 1200.0) * 100 + 640, Math.cos(time / 1100.0) * 110 + 360)
  }
}
