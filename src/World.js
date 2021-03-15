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
    const entities  = this.mainQuery.execute()
    const frameInfo = this.world.getEntity('frame')

    for (const entity of entities) {
      const rotation = entity.getOne('Rotation')
      const mesh     = entity.getOne('HasMesh')

      mesh.mesh.rotation.x += rotation.x * frameInfo.c.time.deltaTime * .0001
      mesh.mesh.rotation.y += rotation.y * frameInfo.c.time.deltaTime * .0001

      mesh.update()
    }
  }
}

class Remesh extends ApeECS.System {
  init() {
    this.mainQuery = this.createQuery().fromAll('HasMesh', 'Visibility', 'Shadows')
  }

  update(tick) {
    const entities = this.mainQuery.execute()

    for (const entity of entities) {
      const visibility = entity.getOne('Visibility')
      const shadows    = entity.getOne('Shadows')
      const mesh       = entity.getOne('HasMesh')

      mesh.mesh.visible       = visibility.visible
      mesh.mesh.castShadow    = shadows.cast
      mesh.mesh.receiveShadow = shadows.receive

      mesh.update()
    }
  }
}

class Reposition extends ApeECS.System {
  init() {
    this.mainQuery = this.createQuery().fromAll('HasMesh', 'Position')
  }

  update(tick) {
    const entities = this.mainQuery.execute()

    for (const entity of entities) {
      const position = entity.getOne('Position')
      const mesh     = entity.getOne('HasMesh')

      mesh.mesh.position.x = position.x
      mesh.mesh.position.y = position.y
      mesh.mesh.position.z = position.z

      mesh.update()
    }
  }
}

class Rematerial extends ApeECS.System {
  init() {
    this.mainQuery = this.createQuery().fromAll('HasMesh', 'Material')
  }

  update(tick) {
    const entities = this.mainQuery.execute()

    for (const entity of entities) {
      const material = entity.getOne('Material')
      const mesh     = entity.getOne('HasMesh')

      mesh.mesh.material.color = {
        r: material.red,
        g: material.green,
        b: material.blue
      }

      mesh.update()
    }
  }
}

class FrameInfo extends ApeECS.Component {}
FrameInfo.properties = {
  deltaTime: 0,
  deltaFrame: 0,
  time: 0,
  epoch: 0,
}

class Visibility extends ApeECS.Component {}
Visibility.properties = {
  visible: true
}

class Shadows extends ApeECS.Component {}
Shadows.properties = {
  cast: false,
  receive: false,
}

class Position extends ApeECS.Component {}
Position.properties = {
  x: 0,
  y: 0,
  z: 0,
}

class Rotation extends ApeECS.Component {}
Rotation.properties = {
  x: 0,
  y: 0,
}

class Material extends ApeECS.Component {}
Material.properties = {
  red: 0,
  green: 1,
  blue: 0,
  kind: 'MeshBasicMaterial',
}

class HasMesh extends ApeECS.Component {}
HasMesh.properties = {
  mesh: {}
}

export const world = new ApeECS.World()

world.registerComponent(FrameInfo)

world.registerComponent(Visibility)
world.registerComponent(Shadows)
world.registerComponent(Position)
world.registerComponent(Rotation)
world.registerComponent(Material)
world.registerComponent(HasMesh)

world.registerSystem('frame', Spin)
world.registerSystem('frame', Remesh)
world.registerSystem('frame', Reposition)
world.registerSystem('frame', Rematerial)

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
    position: {
      type: 'Position',
      x: mesh.position.x,
      y: mesh.position.y,
      z: mesh.position.z,
    },
    material: {
      type: 'Material',
      kind: mesh.material.type,
      red: mesh.material.color.r,
      greeg: mesh.material.color.g,
      blue: mesh.material.color.b,
    },
    visibility: {
      type: 'Visibility',
      visible: mesh.visible,
    },
    shadows: {
      type: 'Shadows',
      cast: mesh.castShadow,
      receive: mesh.receiveShadow,
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
    epoch,
    time,
    deltaTime: delta,
    deltaFrame: delta / 16.667
  })

  world.runSystems('frame')

  lastFrame = time

  window.requestAnimationFrame(update)
}

update(lastFrame)