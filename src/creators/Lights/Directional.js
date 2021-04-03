import {
  Group,
  Object3D,
  CameraHelper,
  DirectionalLight,
} from 'three'

import World, { RegisterEntity } from '../../env'

import { scene } from '../../env'

import { ShadowMapResolutions } from '../helpers'

const create = () => {
  const light = new DirectionalLight(0xffffff, 1)
  const obj   = new Object3D()
  const group = new Group()

  light.position.set(0, 0, 0)

  light.castShadow = true

  const halfWidth  = 25
  const halfHeight = 25

  light.shadow.camera.near = 1
  light.shadow.camera.far  = 50

  light.shadow.camera.left   = halfWidth - (halfWidth * 2)
  light.shadow.camera.right  = halfWidth
  light.shadow.camera.top    = halfHeight
  light.shadow.camera.bottom = halfHeight - ( halfHeight * 2)

  light.shadow.mapSize.width  = ShadowMapResolutions.Medium
  light.shadow.mapSize.height = ShadowMapResolutions.Medium

  light.target = obj
  
  obj.position.set(0, -1, 0)

  const cameraHelper = new CameraHelper(light.shadow.camera)

  const entity = World.createEntity({
    c: {
      editor: {
        type: 'Editor',
        value: 'DirectionalLight',
      },
      intensity: {
        type: 'Intensity',
        value: light.intensity,
        target: light,
      },
      visibility: {
        type: 'Visibility',
        value: light.visible,
        target: light,
      },
      castShadows: {
        type: 'CastShadows',
        value: light.castShadow,
        target: light,
      },
      shadowVolume: {
        type:  'ShadowVolume',
        width:  light.shadow.camera.far,
        height: light.shadow.camera.far,
        depth:  light.shadow.camera.far,
        target: light.shadow.camera,
      },
      shadowMapResolution: {
        type:  'ShadowMapResolution',
        width:  light.shadow.mapSize.width,
        height: light.shadow.mapSize.height,
        target: light.shadow,
      },
      color: {
        type: 'Color',
        r: 255,
        g: 255,
        b: 255,
        target: light.color,
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
      helpers: {
        type: 'Helpers',
        value: [cameraHelper],
      }
    }
  })

  group.add(obj)
  group.add(light)
  group.add(cameraHelper)
  
  scene.add(group)

  RegisterEntity({ EcsId: entity.id, SceneId: group.uuid })
}

export default create
