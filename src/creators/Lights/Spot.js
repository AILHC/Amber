import {
  Object3D,
  SpotLight,
  SpotLightHelper,
} from 'three'

import World, { RegisterEntity } from '../../ecs'

import { scene } from '../../Scene'

const create = () => {
  const light  = new SpotLight(0xffffff, 1)
  const obj    = new Object3D()
  const helper = new SpotLightHelper(light)

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
        x: 97,
        y: 50,
        z: 50,
        target: obj,
      },
      helper: {
        type: 'Helpers',
        value: [helper],
      }
    }
  })
  
  scene.add(obj)
  scene.add(light)
  scene.add(helper)

  RegisterEntity({ EcsId: entity.id, EditorId: ':placeholder:' })
}

export default create
