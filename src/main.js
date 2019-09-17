import 'babel-polyfill'
import Phaser from 'phaser'

import LoadingScene from '/scenes/loading'
import GameScene from '/scenes/game'

import 'phaser/plugins/spine/dist/SpinePlugin' // ???

import '/style.css'

const config = {
  title: 'Parcel+Phaser+Spine Skeleton Project',
  url: '',
  parent: 'game',
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  scale: {
    mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: null,
  backgroundColor: '#4a485f',
  plugins: {
    scene: [
      { key: 'SpinePlugin', plugin: window.SpinePlugin, mapping: 'spine' }
    ]
  }
}

const settings = {
  player: {
    aim: {
      chargeRate: 1,
      minCharge: 500,
      maxCharge: 2000,
      firePower: 300
    }
  },
  pickups: {
    initialDelay: 7000,
    interval: 10000,
    distribution: [
      'health',
      'health',
      'bomb'
    ]
  },
  water: {
    splashImpact: 500,
    wave: {
      passes: 2,
      nodeCount: 100,
      simulationSpeed: 20,
      spread: 0.35
    },
    node: {
      dampening: 0.005,
      tension: 0.005,
      baseWaveSpeed: 0.0001
    }
  }
}

export default class ExampleGame extends Phaser.Game {
  start () {
    super.start()
    this.settings = settings
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
