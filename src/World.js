import {
  Mesh,
  BoxGeometry,
  MeshBasicMaterial,
} from 'three'

const ApeECS = require('ape-ecs')

class Spin extends ApeECS.System {
  init() {
    this.mainQuery = this.createQuery().fromAll('HasMesh', 'Rotation')
  }

  update(tick) {
    const entities = this.mainQuery.execute()
    const frameInfo = this.world.getEntity('frame')

    for (const entity of entities) {
      const rotation = entity.getOne('Rotation')
      const mesh = entity.getOne('HasMesh')

      mesh.mesh.rotation.x += rotation.x * frameInfo.c.time.deltaTime * .0001
      mesh.mesh.rotation.y += rotation.y * frameInfo.c.time.deltaTime * .0001

      mesh.update()
    }
  }
}

class FrameInfo extends ApeECS.Component {}
FrameInfo.properties = {
  deltaTime: 0,
  deltaFrame: 0,
  time: 0
}

class Rotation extends ApeECS.Component {}
Rotation.properties = {
  x: 0,
  y: 0,
}

class HasMesh extends ApeECS.Component {}
HasMesh.properties = {
  mesh: {}
}

export const world = new ApeECS.World()

world.registerComponent(FrameInfo)
world.registerComponent(Rotation)
world.registerComponent(HasMesh)
world.registerSystem('frame', Spin)

const frame = world.createEntity({
  id: 'frame',
  c: {
    time: {
      type: 'FrameInfo',
    }
  }
})

const geometry = new BoxGeometry()
const material = new MeshBasicMaterial({ color: 0x00ff00 })
const mesh = new Mesh(geometry, material)

export const box = world.createEntity({
  id: 'box',
  c: {
    rotation: {
      type: 'Rotation',
    },
    mesh: {
      type: 'HasMesh',
      mesh,
    },
  }
})

// see world.creatEntity and world.createEntities
// in docs/World.md for more details
// world.registerSystem('frame', require('./move.js'))
// world.createEntities(require('./saveGame.json'))

let epoch, lastFrame = Date.now()

function update(time) {
  const delta = time - lastFrame
  
  if (typeof epoch === 'undefined')
    epoch = time

  frame.c.time.update({
    time,
    deltaTime: delta,
    deltaFrame: delta / 16.667
  })

  world.runSystems('frame')

  lastFrame = time

  window.requestAnimationFrame(update)
}

update(lastFrame)