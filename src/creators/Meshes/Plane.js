import {
  Mesh,
  LineSegments,
  PlaneGeometry,
  WireframeGeometry,
  LineBasicMaterial,
  MeshStandardMaterial,
} from 'three'

import World, { RegisterEntity }  from '../../ecs'

import { scene } from '../../Scene'

const create = () => {
  const geometry = new PlaneGeometry(50, 50)
  const mat      = new MeshStandardMaterial({ color: 0x00ff00 })
  const mesh     = new Mesh(geometry, mat)

  const wireframeGeometry = new WireframeGeometry(geometry)
  const wirefameMaterial  = new LineBasicMaterial({ color: 0xffffff })
  const wireframe         = new LineSegments(wireframeGeometry, wirefameMaterial)

  mesh.add(wireframe)

  mesh.position.set(0, -2, 0)
  mesh.rotation.set(-(Math.PI / 2), 0, 0)
  mesh.receiveShadow = true
  
  const entity = World.createEntity({
    c: {
      editor: {
        type: 'Editor',
        value: 'Plane',
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
        r:   0,
        g: 255,
        b:   0,
        target: mesh.material.color,
      },
      visibility: {
        type: 'Visibility',
        visible: mesh.visible,
        target: mesh,
      },
      receiveShadows: {
        type: 'ReceiveShadows',
        value: mesh.receiveShadow,
        target: mesh,
      },
    }
  })
  
  scene.add(mesh)

  RegisterEntity({ EcsId: entity.id, EditorId: ':placeholder:' })
}

export default create
