import React, { useState } from 'react'

import {
  Color,
  HemisphereLight,
} from 'three'

import World, { RegisterEditableEntity } from '../../ecs'

import { scene } from '../../Scene'

import UIText  from '../../ui/Text'
import UIColor from '../../ui/Color'

import UIInlineNormalizedSlider from '../../ui/InlineNormalizedSlider'

import UIWrapper from '../../helpers/FieldsetWrapper'

import ActionToolbar from '../ActionToolbar'

const create = (id, sky, ground, intensity) => {
  const skyColor    = new Color(sky.r    / 255, sky.g    / 255, sky.b    / 255)
  const groundColor = new Color(ground.r / 255, ground.g / 255, ground.b / 255)
  const light       = new HemisphereLight(skyColor, groundColor, intensity)
  
  light.position.set(0, 0, 0)

  World.createEntity({
    id,
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
        r: sky.r,
        g: sky.g,
        b: sky.b,
        target: light.color,
      },
      groundColor: {
        type: 'Color',
        r: ground.r,
        g: ground.g,
        b: ground.b,
        target: light.groundColor,
      }
    }
  })
  
  scene.add(light)

  RegisterEditableEntity(id)
}

const Component = () => {
  const [id,        setId       ] = useState('')
  const [sky,       setSky      ] = useState({ r: 255, g: 255, b: 255 })
  const [ground,    setGround   ] = useState({ r: 255, g: 255, b: 255 })
  const [intensity, setIntensity] = useState(1)

  const reset = () => {
    setId         ('')
    setSky        ({ r: 255, g: 255, b: 255 })
    setGround     ({ r: 255, g: 255, b: 255 })
    setIntensity  (1)
  }

  return <form className="hemisphere-light creator">
    <UIWrapper label="Name"      child={<UIText                   scope="Hemisphere Light" label="name"      value={id}        update={setId}        />} />
    <UIWrapper label="Intensity" child={<UIInlineNormalizedSlider scope="Hemisphere Light" label="intensity" value={intensity} update={setIntensity} />} />
    
    <UIColor scope="Hemisphere Light" label="Sky"    value={sky}    update={setSky}    />
    <UIColor scope="Hemisphere Light" label="Ground" value={ground} update={setGround} />

    <ActionToolbar reset={reset} create={() => create(id, sky, ground, intensity)} createDisabled={id.length <= 1} />
  </form>
}

export default Component
