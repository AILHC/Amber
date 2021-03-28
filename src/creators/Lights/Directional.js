import React, { useState } from 'react'

import Select from 'react-select'

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

import { ShadowMapResolutions } from '../helpers'

import ActionToolbar from '../ActionToolbar'

const shadowMapResolutionOptions = Object.keys(ShadowMapResolutions).map(s => ({
  label: s,
  value: ShadowMapResolutions[s],
}))

const styles = {
  container: provided => ({
    ...provided,
    width:    'auto',
    height:   '1.65rem',
    padding:   0,
    display:  'flex',
    flex:      1,
    fontSize: '1rem',
  }),
  control: () => ({
    display: 'flex',
    flex:     1,
  })
}

const create = (id, color, rotation, lookAt, intensity, castShadows, shadowVolume, shadowMapResolution) => {
  const light = new DirectionalLight(new Color(color.r / 255, color.g / 255, color.b / 255), intensity)
  const obj   = new Object3D()

  light.position.set(0, 0, 0)
  light.castShadow = castShadows

  const halfWidth  = shadowVolume.width  * .5
  const halfHeight = shadowVolume.height * .5

  light.shadow.camera.near = 1
  light.shadow.camera.far  = shadowVolume.depth

  light.shadow.camera.left   = halfWidth - shadowVolume.width
  light.shadow.camera.right  = halfWidth
  light.shadow.camera.top    = halfHeight
  light.shadow.camera.bottom = halfHeight - shadowVolume.height

  light.shadow.mapSize.width  = shadowMapResolution
  light.shadow.mapSize.height = shadowMapResolution

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
      shadowVolume: {
        type:  'ShadowVolume',
        width:  shadowVolume.width,
        height: shadowVolume.height,
        depth:  light.shadow.camera.far,
        target: light.shadow.camera,
      },
      shadowMapResolution: {
        type:  'ShadowMapResolution',
        width:  light.shadow.mapSize.width,
        height: light.shadow.mapSize.height,
        target: light.shadow,
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
      },
      helpers: {
        type: 'Helpers',
        value: [cameraHelper],
      }
    }
  })
  
  scene.add(obj)
  scene.add(light)

  scene.add(cameraHelper)

  RegisterEditableEntity(id)
}

const axis = (label, context, fn, type = 'NormalizedSlider', step, min, max) => ({
  min,
  max,
  step,
  type,
  label,
  scope:       'Directional Light',
  value:        context[label],
  update:       val => fn({ ...context, [label]: val }),
  displayValue: convert(context[label]),
})

const convert = val => `${Math.round(((val - 50) * 2) * 1.8)}°`

const Component = () => {
  const [id,          setId         ] = useState('')
  const [color,       setColor      ] = useState({ r: 255, g: 255, b: 255 })
  const [lookAt,      setLookAt     ] = useState({ x:   0, y:  -1, z:   0 })
  const [rotation,    setRotation   ] = useState({ x:  50, y:  50, z:  50 })
  const [intensity,   setIntensity  ] = useState(1)

  const [castShadows,         setCastShadows        ] = useState(true)
  const [shadowVolume,        setShadowVolume       ] = useState({ width: 50, height: 50, depth: 50 })
  const [shadowMapResolution, setShadowMapResolution] = useState(ShadowMapResolutions.Medium)

  const reset = () => {
    setId        ('')
    setColor     ({ r: 255, g: 255, b: 255 })
    setLookAt    ({ x:   0, y:  -1, z:   0 })
    setRotation  ({ x:  50, y:  50, z:  50 })
    setIntensity (1)

    setCastShadows         (true)
    setShadowVolume        ({ width: 50, height: 50, depth: 50 })
    setShadowMapResolution (ShadowMapResolutions.Medium)
  }

  const rotationFields = [
    axis('x', rotation, setRotation),
    axis('y', rotation, setRotation),
    axis('z', rotation, setRotation),
  ]

  const volumeFields = [
    axis('width',  shadowVolume, setShadowVolume, 'Slider', 2, 4, 500),
    axis('height', shadowVolume, setShadowVolume, 'Slider', 2, 4, 500),
    axis('depth',  shadowVolume, setShadowVolume, 'Slider', 1, 2, 500),
  ]

  const ResolutionSelector = <Select
    defaultValue={shadowMapResolutionOptions.find(s => s.value === shadowMapResolution)}
    styles={styles}
    options={shadowMapResolutionOptions}
    onChange={(sel, meta) => {
      if (meta.action === 'select-option')
        setShadowMapResolution(sel.value)
      else if (meta.action === 'clear')
        setShadowMapResolution(undefined)
    }}
  />

  return <form className="directional-light creator">
    <UIWrapper label="Name"            child={<UIText                   scope="Directional Light" label="name"      value={id}        update={setId}        />} />
    <UIWrapper label="Intensity"       child={<UIInlineNormalizedSlider scope="Directional Light" label="intensity" value={intensity} update={setIntensity} />} />

    <UIColor scope="Directional Light" value={color} update={setColor} />

    <UIObject scope="Directional Light" label="Rotation" fields={rotationFields} summaryConverter={convert} />

    <h3>Shadows</h3>
    <UIWrapper label="Cast"       child={<UIToggle scope="Directional Light" label="cast" value={castShadows} update={() => setCastShadows(!castShadows)} />} />
    <UIWrapper label="Resolution" child={ResolutionSelector} />
    <UIObject  scope="Directional Light" label="Volume" fields={volumeFields} />

    <ActionToolbar reset={reset} create={() => create(id, color, rotation, lookAt, intensity, castShadows, shadowVolume, shadowMapResolution)} createDisabled={id.length <= 1} />
  </form>
}

export default Component
