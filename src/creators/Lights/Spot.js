import {
  Group,
  Object3D,
  SpotLight,
  SpotLightHelper,
} from 'three'

import World, { RegisterEntity } from '../../env'

import { scene } from '../../env'

const create = () => {
  const light  = new SpotLight(0xffffff, 1)
  const obj    = new Object3D()
  const helper = new SpotLightHelper(light)
  const group  = new Group()

  light.position.set(0, 0, 0)
  light.castShadow = true
  light.target = obj
  
  obj.position.set(0, -1, 0)

  const entity = World.createEntity({
    c: {
      editor: {
        type: 'Editor',
        value: 'SpotLight',
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
      helper: {
        type: 'Helpers',
        value: [helper],
      }
    }
  })
  
  group.add(obj)
  group.add(light)

  scene.add(group)
  scene.add(helper)

  RegisterEntity({ EcsId: entity.id, SceneId: group.uuid })
}

export default create
