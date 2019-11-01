import 'babel-polyfill'
import Phaser from 'phaser'

import LoadingScene from '/scenes/loading'
import GameScene from '/scenes/game'

import SpinePlugin from 'phaser/plugins/spine/src/SpinePlugin'

import '/style.css'

const config = {
  title: 'Parcel+Phaser+Spine Skeleton Project',
  url: '',
  parent: 'game',
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: null,
  backgroundColor: '#4a485f',
  plugins: {
    scene: [
      { key: 'SpinePlugin', plugin: SpinePlugin, mapping: 'spine' }
    ]
  }
}

const settings = {
}

export default class ExampleGame extends Phaser.Game {
  start () {
    super.start()
    this.settings = settings

    this.input.keyboard.addCapture('SPACE') // to prevent the page from scrolling
    this.scene.add('LoadingScene', LoadingScene, true)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const game = new ExampleGame(config)
  if (process.env.NODE_ENV !== 'production') {
    window.game = game
  }
})

if (module.hot && process.env.NODE_ENV !== 'production') {
  module.hot.dispose(() => {
    if (window.game) {
      window.game.scene.remove('GameScene')
    }
  })
  module.hot.accept(() => {
    if (window.game) {
      window.game.scene.add('GameScene', GameScene, true)
    }
  })
}
