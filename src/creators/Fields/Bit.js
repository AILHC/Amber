import {
  Mesh,
  Color,
  Group,
  Object3D,
  BoxGeometry,
  PlaneGeometry,
  InstancedMesh,
  MeshStandardMaterial,
} from 'three'

import World, {
  scene,
  RegisterEntity,
} from '../../env'

const formulas = {
  'mod xor 5':  (x, y) => (x ^ y) %  5,
  'mod xor 9':  (x, y) => (x ^ y) %  9,
  'mod xor 17': (x, y) => (x ^ y) % 17,
  'mod xor 33': (x, y) => (x ^ y) % 33,
  'mod or 7':   (x, y) => (x | y) %  7,
  'mod or 17':  (x, y) => (x | y) % 17,
  'mod or 29':  (x, y) => (x | y) % 29,
  'and mul 24': (x, y) => (x * y) & 24,
  'and mul 47': (x, y) => (x * y) & 47,
  'and mul 64': (x, y) => (x * y) & 64,
}

let zeroes = []

export const instantiate = (width, depth, formula) => {
  for (let x = 0; x < width; x++)
    for (let z = 0; z < depth; z++)
      if (!formulas[formula](x, z)) zeroes.push({ x, z })

  const material = new MeshStandardMaterial({ color: new Color(.25, .75, 0) })
  const geometry = new BoxGeometry(1, 1, 1)

  const instanced   = new InstancedMesh(geometry, material, zeroes.length)
  const placeholder = new Object3D()

  instanced.castShadow    = true
  instanced.receiveShadow = true

  let c = 0

  for (const i of zeroes) {
    const height = Math.random() + .5

    placeholder.scale.set(1, height, 1)
    placeholder.position.set(i.x - (width * .5), height * .5, i.z - (depth * .5))
    placeholder.updateMatrix()

    instanced.setMatrixAt(c++, placeholder.matrix)
  }

  return instanced;
}

export const createBitField = ({ width, depth, formula }) => {
  const group         = new Group(),
        instanced     = instantiate(width, depth, formula),
        planeGeometry = new PlaneGeometry(width, depth),
        planeMaterial = new MeshStandardMaterial({ color: 0x999999 }),
        planeMesh     = new Mesh(planeGeometry, planeMaterial)

  planeMesh.receiveShadow = true

  planeMesh.rotateX(-(Math.PI * .5))

  planeMesh.updateMatrix()

  const entity = World.createEntity({
    c: {
      editor: {
        type: 'Editor',
        value: 'Bit',
      },
      rotation: {
        type: 'Rotation',
        x: group.rotation.x,
        y: group.rotation.y,
        z: group.rotation.z,
        target: group.rotation,
      },
      position: {
        type: 'Position',
        x: group.position.x,
        y: group.position.y,
        z: group.position.z,
        target: group.position,
      },
      visibility: {
        type: 'Visibility',
        visible: group.visible,
        target: group,
      },
    }
  })

  group.add(planeMesh)
  group.add(instanced)

  scene.add(group)

  RegisterEntity({ EcsId: entity.id, SceneId: group.uuid })
}

const defaultBitFieldCreator = () => createBitField({
  width: 100,
  depth: 100,

  formula: 'mod xor 9',
})

export default defaultBitFieldCreator
