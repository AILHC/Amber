import React, { useState } from 'react'

import {
  Color,
  PointLight,
  PointLightHelper,
} from 'three'

import World, { RegisterEditableEntity } from '../../ecs'

import { scene } from '../../Scene'

import UIText   from '../../ui/Text'
import UIColor  from '../../ui/Color'
import UIToggle from '../../ui/Toggle'

import UIInlineNormalizedSlider from '../../ui/InlineNormalizedSlider'

import UIWrapper from '../../helpers/FieldsetWrapper'

import ActionToolbar from '../ActionToolbar'

const create = (id, color, intensity, castShadows) => {
  const light  = new PointLight(new Color(color.r / 255, color.g / 255, color.b / 255), intensity)
  const helper = new PointLightHelper(light)

  light.position.set(0, 0, 0)
  light.castShadow = castShadows

  World.createEntity({
    id,
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
        r: color.r,
        g: color.g,
        b: color.b,
        target: light.color,
      },
      helper: {
        type: 'Helpers',
        value: [helper],
      }
    }
  })
  
  scene.add(light)
  scene.add(helper)

  RegisterEditableEntity(id)
}

const Component = () => {
  const [id, setId] = useState('')
  const [color, setColor] = useState({ r: 255, g: 255, b: 255 })
  const [intensity, setIntensity] = useState(1)
  const [castShadows, setCastShadows] = useState(true)

  const reset = () => {
    setId         ('')
    setColor      ({ r: 255, g: 255, b: 255 })
    setIntensity  (1)
    setCastShadows(true)
  }

  return <form className="point-light creator">
    <UIWrapper label="Name"         child={<UIText                   scope="Point Light" label="name"      value={id}          update={setId}                              />} />
    <UIWrapper label="Intensity"    child={<UIInlineNormalizedSlider scope="Point Light" label="intensity" value={intensity}   update={setIntensity}                       />} />
    <UIWrapper label="Cast Shadows" child={<UIToggle                 scope="Point Light" label="cast"      value={castShadows} update={() => setCastShadows(!castShadows)} />} />

    <UIColor scope="Point Light" value={color} update={setColor} />

    <ActionToolbar reset={reset} create={() => create(id, color, intensity, castShadows)} createDisabled={id.length <= 1} />
  </form>
}

export default Component
