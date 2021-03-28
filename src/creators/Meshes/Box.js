import {
  Mesh,
  BoxGeometry,
  LineSegments,
  WireframeGeometry,
  LineBasicMaterial,
  MeshStandardMaterial,
} from 'three'

import World, { RegisterEntity } from '../../ecs'

import { scene } from '../../Scene'

const create = () => {
  const geometry = new BoxGeometry(1, 1, 1)
  const mat      = new MeshStandardMaterial({ color: 0x00ffff })
  const mesh     = new Mesh(geometry, mat)
  
  const wireframeGeometry = new WireframeGeometry(geometry)
  const wirefameMaterial  = new LineBasicMaterial({ color: 0xffffff })
  const wireframe         = new LineSegments(wireframeGeometry, wirefameMaterial)

  mesh.add(wireframe)

  mesh.position.set(0, 0, 0)

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
      rotation: {
        type: 'Rotation',
        x: mesh.rotation.x,
        y: mesh.rotation.y,
        z: mesh.rotation.z,
        target: mesh.rotation,
      },
      position: {
        type: 'Position',
        x: mesh.position.x,
        y: mesh.position.y,
        z: mesh.position.z,
        target: mesh.position,
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
        visible: mesh.visible,
        target:  mesh,
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
  
  scene.add(mesh)

  RegisterEntity({ EcsId: entity.id, EditorId: ':placeholder:' })
}

export default create
