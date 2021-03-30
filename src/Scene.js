import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
} from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export const scene = new Scene()

let renderer, camera

export const initialize = (width, height) => {
  const canvas = document.getElementById('primary-window')

  camera   = new PerspectiveCamera(75, width / height, 0.1, 1000)
  renderer = new WebGLRenderer({ canvas, antialias: true })

  const controls = new OrbitControls(camera, canvas)

  controls.target.set(0, 0, 0)
  controls.update()

  renderer.shadowMap.enabled = true

  camera.position.z = 5

  renderer.setSize(width, height)
}

export const render = () => {
  renderer.render(scene, camera)

  requestAnimationFrame(render)
}