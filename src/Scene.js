import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
} from 'three'

export const scene = new Scene()

let renderer, camera

export const initialize = (width, height) => {
  const canvas = document.getElementById('scene-view')
  
  camera   = new PerspectiveCamera(75, width / height, 0.1, 1000)
  renderer = new WebGLRenderer({ canvas })

  camera.position.z = 5

  renderer.setSize(width, height)
}

export const populate = elements => {
  for (const e of elements)
    scene.add(e)
}

export const render = () => {
  requestAnimationFrame(render)

  renderer.render(scene, camera)
}