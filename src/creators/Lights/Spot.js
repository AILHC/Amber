import React, { useState } from 'react'

import {
  Color,
  Object3D,
  SpotLight,
  SpotLightHelper,
} from 'three'

import World, { RegisterEditableEntity } from '../../ecs'

import { scene } from '../../Scene'

import UIText   from '../../ui/Text'
import UIColor  from '../../ui/Color'
import UIObject from '../../ui/Object'
import UIToggle from '../../ui/Toggle'

import UIInlineNormalizedSlider from '../../ui/InlineNormalizedSlider'

import UIWrapper from '../../helpers/FieldsetWrapper'

const create = (id, color, rotation, lookAt, intensity, castShadows) => {
  const light  = new SpotLight(new Color(color.r / 255, color.g / 255, color.b / 255), intensity)
  const obj    = new Object3D()
  const helper = new SpotLightHelper(light)

  light.position.set(0, 0, 0)
  light.castShadow = castShadows

  light.target = obj
  
  obj.position.set(lookAt.x, lookAt.y, lookAt.z)

  World.createEntity({
    id,
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
        r: color.r,
        g: color.g,
        b: color.b,
        target: light.color,
      },
      rotation: {
        type: 'Rotation',
        x: -50 + rotation.x,
        y: rotation.y,
        z: rotation.z,
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

  RegisterEditableEntity(id)
}

const rotationCommon = {
  type: 'NormalizedSlider',
  scope: 'Spot Light',
}

const convert = val => `${Math.round(((val - 50) * 2) * 1.8)}°`

const Component = () => {
  const [id, setId] = useState('')
  const [color, setColor] = useState({ r: 255, g: 255, b: 255 })
  const [lookAt, setLookAt] = useState({x: 0, y: -1, z: 0 })
  const [rotation, setRotation] = useState({ x: 50, y: 50, z: 50 })
  const [intensity, setIntensity] = useState(1)
  const [castShadows, setCastShadows] = useState(true)

  const doCreate = e => {
    create(
      id,
      color,
      rotation,
      lookAt,
      intensity,
      castShadows
    )

    e.preventDefault()
  }

  const rotationFields = [{
    label: 'x',
    value: rotation.x,
    displayValue: convert(rotation.x),
    update: val => {
      setLookAt(/* Somthing */)
      setRotation({ ...rotation, x: val })
    },
    ...rotationCommon,
  }, {
    label: 'y',
    value: rotation.y,
    displayValue: convert(rotation.y),
    update: val => {
      setLookAt(/* Somthing */)
      setRotation({ ...rotation, y: val })
    },
    ...rotationCommon,
  }, {
    type: 'NormalizedSlider',
    label: 'z',
    value: rotation.z,
    displayValue: convert(rotation.z),
    update: val => {
      setLookAt(/* Somthing */)
      setRotation({ ...rotation, z: val })
    },
    ...rotationCommon,
  }]

  return <form className="spot-light creator">
    <UIWrapper label="Name"         child={<UIText                   scope="Spot Light" label="name"      value={id}          update={setId}                              />} />
    <UIWrapper label="Intensity"    child={<UIInlineNormalizedSlider scope="Spot Light" label="intensity" value={intensity}   update={setIntensity}                       />} />
    <UIWrapper label="Cast Shadows" child={<UIToggle                 scope="Spot Light" label="cast"      value={castShadows} update={() => setCastShadows(!castShadows)} />} />

    <UIColor scope="Spot Light" value={color} update={setColor} />

    <UIObject scope="Spot Light" label="Rotation" fields={rotationFields} summaryConverter={convert} />

    <button
      className="btn btn-primary"
      onClick={doCreate}
    >Create</button>
  </form>
}

export default Component
