import {
  Mesh,
  Color,
  Group,
  BoxGeometry,
  LineSegments,
  WireframeGeometry,
  LineBasicMaterial,
  MeshStandardMaterial,
} from 'three'

import World, {
  scene,
  RegisterEntity,
} from '../../env'

export const createMeshBox = ({ width, height, depth, x, y, z, cast, receive, color }) => {
  const geometry = new BoxGeometry(width, height, depth)
  const mat      = new MeshStandardMaterial({ color })
  const mesh     = new Mesh(geometry, mat)
  
  const wireframeGeometry = new WireframeGeometry(geometry)
  const wirefameMaterial  = new LineBasicMaterial({ color: 0xffffff })
  const wireframe         = new LineSegments(wireframeGeometry, wirefameMaterial)

  const group = new Group()

  group.add(mesh)
  group.add(wireframe)

  group.position.set(x, y, z)

  mesh.castShadow    = cast
  mesh.receiveShadow = receive
  
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
        width,
        height,
        depth,
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
        r: color.r * 255,
        g: color.g * 255,
        b: color.b * 255,
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

const defaultMeshBoxCreator = () => createMeshBox({
  width:  1,
  height: 1,
  depth:  1,

  x: 0,
  y: 0,
  z: 0,

  cast:    true,
  receive: false,

  color: new Color(0, 1, 1),
})

export default defaultMeshBoxCreator
