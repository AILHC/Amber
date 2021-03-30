import {
  Mesh,
  Group,
  LineSegments,
  PlaneGeometry,
  WireframeGeometry,
  LineBasicMaterial,
  MeshStandardMaterial,
} from 'three'

import World, { RegisterEntity }  from '../../env'

import { scene } from '../../env'

const create = () => {
  const geometry = new PlaneGeometry(1, 1)
  const mat      = new MeshStandardMaterial({ color: 0x00ff00 })
  const mesh     = new Mesh(geometry, mat)

  const wireframeGeometry = new WireframeGeometry(geometry)
  const wirefameMaterial  = new LineBasicMaterial({ color: 0xffffff })
  const wireframe         = new LineSegments(wireframeGeometry, wirefameMaterial)

  const group = new Group()

  group.add(mesh)
  group.add(wireframe)

  group.position.set(0, 0, 0)
  group.rotation.set(0, 0, 0)

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
      size: {
        type: 'PlaneSize',
        width:  1,
        height: 1,
        target: group,
      },
      segments: {
        type: 'PlaneSegments',
        wide: 1,
        high: 1,
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
        r:   0,
        g: 255,
        b:   0,
        target: mesh.material.color,
      },
      visibility: {
        type: 'Visibility',
        visible: group.visible,
        target: group,
      },
      receiveShadows: {
        type: 'ReceiveShadows',
        value: mesh.receiveShadow,
        target: mesh,
      },
    }
  })
  
  scene.add(group)

  RegisterEntity({ EcsId: entity.id, SceneId: group.uuid })
}

export default create
