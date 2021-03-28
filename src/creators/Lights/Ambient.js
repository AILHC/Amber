import React, { useState } from 'react'

import {
  Color,
  AmbientLight,
} from 'three'

import World, { RegisterEditableEntity } from '../../ecs'

import { scene } from '../../Scene'

import UIText  from '../../ui/Text'
import UIColor from '../../ui/Color'

import UIInlineNormalizedSlider from '../../ui/InlineNormalizedSlider'

import UIWrapper from '../../helpers/FieldsetWrapper'

import ActionToolbar from '../ActionToolbar'

const create = (id, color, intensity) => {
  const light  = new AmbientLight(new Color(color.r / 255, color.g / 255, color.b / 255), intensity)
  
  light.position.set(0, 0, 0)

  World.createEntity({
    id,
    c: {
      editor: {
        type: 'Editor',
        value: 'AmbientLight',
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
      color: {
        type: 'Color',
        r: color.r,
        g: color.g,
        b: color.b,
        target: light.color,
      }
    }
  })
  
  scene.add(light)

  RegisterEditableEntity(id)
}

const Component = () => {
  const [id, setId] = useState('')
  const [color, setColor] = useState({ r: 255, g: 255, b: 255 })
  const [intensity, setIntensity] = useState(1)

  const reset = () => {
    setId         ('')
    setColor      ({ r: 255, g: 255, b: 255 })
    setIntensity  (1)
  }

  return <form className="ambient-light creator">
    <UIWrapper label="Name"      child={<UIText                   scope="Ambient Light" label="name"      value={id}        update={setId}        />} />
    <UIWrapper label="Intensity" child={<UIInlineNormalizedSlider scope="Ambient Light" label="intensity" value={intensity} update={setIntensity} />} />
    
    <UIColor scope="Ambient Light" value={color} update={setColor} />

    <ActionToolbar reset={reset} create={() => create(id, color, intensity)} createDisabled={id.length <= 1} />
  </form>
}

export default Component
