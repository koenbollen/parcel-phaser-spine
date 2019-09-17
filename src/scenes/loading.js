import Phaser from 'phaser'

import GameScene from '/scenes/game'

function assets (loader) {
  loader.image('white', 'images/white.png')
  loader.image('background', 'images/background.png')
}

export default class LoadingScene extends Phaser.Scene {
  init (params) {
  }

  create () {
    const text = this.add.text(this.game.config.width / 2, this.game.config.height / 2, 'Loading...', { font: '56px Arial', fill: '#dddddd', align: 'center' })
    text.setOrigin(0.5)

    assets(this.load)

    this.load.on('load', (file) => {
      console.log('Asset', file.key, 'loaded')
    })

    this.load.on('progress', progress => {
      text.setText('Loading... ' + Math.round(progress * 100) + '%')
    })

    this.load.once('complete', () => {
      console.log('Complete')
      text.destroy()

      // this.scene.add('TitleScene', TitleScene, false)
      this.scene.add('GameScene', GameScene, false)

      // this.scene.start('TitleScene')
      if (process.env.NODE_ENV !== 'production') {
        this.scene.start('GameScene')
      }
    })

    this.load.start()
  }
}
