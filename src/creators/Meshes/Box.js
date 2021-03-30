import {
  Mesh,
  Group,
  BoxGeometry,
  LineSegments,
  WireframeGeometry,
  LineBasicMaterial,
  MeshStandardMaterial,
} from 'three'

import World, { RegisterEntity } from '../../env'

import { scene } from '../../env'

const create = () => {
  const geometry = new BoxGeometry(1, 1, 1)
  const mat      = new MeshStandardMaterial({ color: 0x00ffff })
  const mesh     = new Mesh(geometry, mat)
  
  const wireframeGeometry = new WireframeGeometry(geometry)
  const wirefameMaterial  = new LineBasicMaterial({ color: 0xffffff })
  const wireframe         = new LineSegments(wireframeGeometry, wirefameMaterial)

  const group = new Group()

  group.add(mesh)
  group.add(wireframe)

  group.position.set(0, 0, 0)

  mesh.castShadow    = true
  mesh.receiveShadow = false
  
  const entity = World.createEntity({
    c: {
      editor: {
        type:  'Editor',
        value: 'Box',
      },
      wireframe: {
        type:  'Wireframe',
        target: wireframe,
      },
      size: {
        type: 'BoxSize',
        width:  1,
        height: 1,
        depth:  1,
        target: group,
      },
      segments: {
        type: 'BoxSegments',
        wide: 1,
        high: 1,
        deep: 1,
        target: group,
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
      color: {
        type: 'Color',
        r: 0,
        g: 255,
        b: 255,
        target: mesh.material.color,
      },
      visibility: {
        type:   'Visibility',
        visible: group.visible,
        target:  group,
      },
      receiveShadows: {
        type:  'ReceiveShadows',
        value:  mesh.receiveShadow,
        target: mesh,
      },
      castShadows: {
        type:  'CastShadows',
        value:  mesh.castShadow,
        target: mesh,
      },
    }
  })

  wireframe.name = entity.id
  
  scene.add(group)

  RegisterEntity({ EcsId: entity.id, SceneId: group.uuid })
}

export default create
