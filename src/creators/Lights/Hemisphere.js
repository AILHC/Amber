import {
  Color,
  HemisphereLight,
} from 'three'

import World, { RegisterEntity } from '../../ecs'

import { scene } from '../../Scene'

const create = () => {
  const skyColor    = new Color(.5, .5,  1)
  const groundColor = new Color(.5,  1, .5)
  const light       = new HemisphereLight(skyColor, groundColor, .5)
  
  light.position.set(0, 0, 0)

  const entity = World.createEntity({
    c: {
      editor: {
        type: 'Editor',
        value: 'HemisphereLight',
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
      skyColor: {
        type: 'Color',
        r: 127,
        g: 127,
        b: 255,
        target: light.color,
      },
      groundColor: {
        type: 'Color',
        r: 127,
        g: 255,
        b: 127,
        target: light.groundColor,
      }
    }
  })
  
  scene.add(light)

  RegisterEntity({ EcsId: entity.id, EditorId: ':placeholder:' })
}

export default create
