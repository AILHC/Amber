import { AmbientLight } from 'three'

import World, { RegisterEntity } from '../../ecs'

import { scene } from '../../Scene'

const create = () => {
  const light  = new AmbientLight(0xffffff, .5)
  
  light.position.set(0, 0, 0)

  const entity = World.createEntity({
    c: {
      editor: {
        type:  'Editor',
        value: 'AmbientLight',
      },
      intensity: {
        type:  'Intensity',
        value:  light.intensity,
        target: light,
      },
      visibility: {
        type:  'Visibility',
        value:  light.visible,
        target: light,
      },
      color: {
        type: 'Color',
        r: 255,
        g: 255,
        b: 255,
        target: light.color,
      }
    }
  })
  
  scene.add(light)

  RegisterEntity({ EcsId: entity.id, EditorId: ':placeholder:' })
}

export default create
