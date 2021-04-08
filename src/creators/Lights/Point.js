import {
  Group,
  PointLight,
  PointLightHelper,
} from 'three'

import World, { RegisterEntity } from '../../env'

import { scene } from '../../env'

const create = () => {
  const light  = new PointLight(0xffffff, 1)
  const helper = new PointLightHelper(light)

  light.position.set(0, 0, 0)

  light.castShadow = true

  const entity = World.createEntity({
    c: {
      editor: {
        type: 'Editor',
        value: 'PointLight',
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
      position: {
        type: 'Position',
        x: light.position.x,
        y: light.position.y,
        z: light.position.z,
        target: light.position,
      },
      helpers: {
        type: 'Helpers',
        value: [helper],
      }
    }
  })

  helper.name = `${entity.id}-light-helper`
  
  scene.add(light)
  scene.add(helper)

  RegisterEntity({ EcsId: entity.id, SceneId: light.uuid })
}

export default create
