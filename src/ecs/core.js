import {
  Mesh,
  Color,
  BoxGeometry,
  MeshLambertMaterial,
} from 'three'

import World from './Ape'

import C from './components'
import S from'./systems'

export const Components = C
export const Systems    = S

const frame = World.createEntity({
  id: 'frame',
  c: {
    time: {
      type: 'CurrentFrame',
    }
  }
})

const geometry = new BoxGeometry()
const material = new MeshLambertMaterial({ color: new Color('green') })
const mesh = new Mesh(geometry, material)

export const box = World.createEntity({
  id: 'box',
  c: {
    rotation: {
      type: 'Rotation',
      x: mesh.rotation.x,
      y: mesh.rotation.y,
      target: mesh.rotation,
    },
    position: {
      type: 'Position',
      x: mesh.position.x,
      y: mesh.position.y,
      z: mesh.position.z,
      target: mesh.position,
    },
    material: {
      type: 'MaterialColor',
      r: mesh.material.color.r,
      g: mesh.material.color.g,
      b: mesh.material.color.b,
      target: mesh.material,
    },
    visibility: {
      type: 'Visibility',
      visible: mesh.visible,
      target: mesh,
    },
    castShadows: {
      type: 'CastShadows',
      value: mesh.castShadow,
      target: mesh,
    },
    receiveShadows: {
      type: 'ReceiveShadows',
      value: mesh.receiveShadow,
      target: mesh,
    },
  }
})

box.mesh = mesh

let epoch = Date.now(), lastFrame = epoch

const { time } = frame.c

const loop = t => {
  const delta = t - lastFrame

  time.update({
    epoch,
    time: t,
    deltaTime: delta,
    deltaFrame: delta / 16.667
  })

  World.runSystems('frame')

  lastFrame = t

  requestAnimationFrame(loop)
}

loop(lastFrame)