import { AmbientLight } from 'three'

import World, { RegisterEntity } from '../../env'

import { scene } from '../../env'

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
      },
      position: {
        type: 'Position',
        x: light.position.x,
        y: light.position.y,
        z: light.position.z,
        target: light.position,
      },
    }
  })
  
  scene.add(light)

  RegisterEntity({ EcsId: entity.id, SceneId: light.uuid })
}

export default create
