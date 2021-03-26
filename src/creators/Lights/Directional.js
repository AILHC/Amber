import React, { useState } from 'react'

import {
  Color,
  Object3D,
  CameraHelper,
  DirectionalLight,
} from 'three'

import World, { RegisterEditableEntity } from '../../ecs'

import { scene } from '../../Scene'

import UIWrapper from '../../helpers/FieldsetWrapper'

import UIText   from '../../ui/Text'
import UIColor  from '../../ui/Color'
import UIObject from '../../ui/Object'
import UIToggle from '../../ui/Toggle'

import UIInlineNormalizedSlider from '../../ui/InlineNormalizedSlider'

import ActionToolbar from '../ActionToolbar'

const create = (id, color, rotation, lookAt, intensity, castShadows) => {
  const light = new DirectionalLight(new Color(color.r / 255, color.g / 255, color.b / 255), intensity)
  const obj   = new Object3D()

  light.position.set(0, 0, 0)
  light.castShadow = castShadows

  light.target = obj
  
  obj.position.set(lookAt.x, lookAt.y, lookAt.z)

  const cameraHelper = new CameraHelper(light.shadow.camera)

  World.createEntity({
    id,
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
      color: {
        type: 'Color',
        r: color.r,
        g: color.g,
        b: color.b,
        target: light.color,
      },
      rotation: {
        type: 'Rotation',
        x: 47 + rotation.x,
        y: rotation.y,
        z: rotation.z,
        target: obj,
      }
    }
  })
  
  scene.add(obj)
  scene.add(light)

  scene.add(cameraHelper)

  RegisterEditableEntity(id)
}

const axis = (label, context, fn) => ({
  type:  'NormalizedSlider',
  scope: 'Directional Light',
  label,
  value: context[label],
  displayValue: convert(context[label]),
  update: val => fn({ ...context, [label]: val }),
})

const convert = val => `${Math.round(((val - 50) * 2) * 1.8)}°`

const Component = () => {
  const [id,          setId         ] = useState('')
  const [color,       setColor      ] = useState({ r: 255, g: 255, b: 255 })
  const [lookAt,      setLookAt     ] = useState({ x:   0, y:  -1, z:   0 })
  const [rotation,    setRotation   ] = useState({ x:  50, y:  50, z:  50 })
  const [intensity,   setIntensity  ] = useState(1)
  const [castShadows, setCastShadows] = useState(true)

  const reset = () => {
    setId         ('')
    setColor      ({ r: 255, g: 255, b: 255 })
    setLookAt     ({ x:   0, y:  -1, z:   0 })
    setRotation   ({ x:  50, y:  50, z:  50 })
    setIntensity  (1)
    setCastShadows(true)
  }

  const rotationFields = [
    axis('x', rotation, setRotation),
    axis('y', rotation, setRotation),
    axis('z', rotation, setRotation),
  ]

  return <form className="directional-light creator">
    <UIWrapper label="Name"         child={<UIText                   scope="Directional Light" label="name"      value={id}          update={setId}                              />} />
    <UIWrapper label="Intensity"    child={<UIInlineNormalizedSlider scope="Directional Light" label="intensity" value={intensity}   update={setIntensity}                       />} />
    <UIWrapper label="Cast Shadows" child={<UIToggle                 scope="Directional Light" label="cast"      value={castShadows} update={() => setCastShadows(!castShadows)} />} />

    <UIColor scope="Directional Light" value={color} update={setColor} />

    <UIObject scope="Directional Light" label="Rotation" fields={rotationFields} summaryConverter={convert} />

    <ActionToolbar reset={reset} create={() => create(id, color, rotation, lookAt, intensity, castShadows)} createDisabled={id.length <= 1} />
  </form>
}

export default Component
