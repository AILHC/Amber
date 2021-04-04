import {
  Mesh,
  Color,
  Group,
  LineSegments,
  PlaneGeometry,
  WireframeGeometry,
  LineBasicMaterial,
  MeshStandardMaterial,
} from 'three'

import World, { RegisterEntity }  from '../../env'

import { scene } from '../../env'

export const createMeshPlane = ({
  width, height,
   x,  y,  z,
  rx, ry, rz,
  color,
  receive
}) => {
  const geometry = new PlaneGeometry(width, height)
  const mat      = new MeshStandardMaterial({ color })
  const mesh     = new Mesh(geometry, mat)

  const wireframeGeometry = new WireframeGeometry(geometry)
  const wirefameMaterial  = new LineBasicMaterial({ color: 0xffffff })
  const wireframe         = new LineSegments(wireframeGeometry, wirefameMaterial)

  const group = new Group()

  group.add(mesh)
  group.add(wireframe)

  group.position.set( x,  y,  z)
  group.rotation.set(rx, ry, rz)

  mesh.receiveShadow = receive
  
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
        width,
        height,
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
        r: color.r * 255,
        g: color.g * 255,
        b: color.b * 255,
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

const defaultMeshPlaneCreator = () => createMeshPlane({
  width:  1,
  height: 1,

  x: 0,
  y: 0,
  z: 0,

  rx: 0,
  ry: 0,
  rz: 0,

  receive: true,

  color: new Color(0, 1, 0),
})

export default defaultMeshPlaneCreator
