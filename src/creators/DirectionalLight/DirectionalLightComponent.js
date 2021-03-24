import React from 'react'

import Text   from '../../ui/Text'
import Color  from '../../ui/Color'
import Object from '../../ui/Object'
import Toggle from '../../ui/Toggle'

import InlineNormalizedSlider from '../../ui/InlineNormalizedSlider'

import Wrapper from '../../helpers/FieldsetWrapper'

const rotationCommon = {
  type: 'NormalizedSlider',
  scope: 'Directional Light',
}

const convert = val => `${Math.round(((val - 50) * 2) * 1.8)}°`

const Component = ({
  id,
  color,
  setId,
  create,
  lookAt,
  rotation,
  setColor,
  intensity,
  castShadows,
  setRotation,
  setIntensity,
  toggleCastShadows,
  setLookAtPosition,
}) => {
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
      setLookAtPosition(/* Somthing */)
      setRotation({ ...rotation, x: val })
    },
    ...rotationCommon,
  }, {
    label: 'y',
    value: rotation.y,
    displayValue: convert(rotation.y),
    update: val => {
      setLookAtPosition(/* Somthing */)
      setRotation({ ...rotation, y: val })
    },
    ...rotationCommon,
  }, {
    type: 'NormalizedSlider',
    label: 'z',
    value: rotation.z,
    displayValue: convert(rotation.z),
    update: val => {
      setLookAtPosition(/* Somthing */)
      setRotation({ ...rotation, z: val })
    },
    ...rotationCommon,
  }]

  return <form className="direcitonal-light creator">
    <Wrapper name="Name"         child={<Text                   scope="Directional Light" name="name"      value={id}          update={setId}             />} />
    <Wrapper name="Intensity"    child={<InlineNormalizedSlider scope="Direcitonal Light" name="intensity" value={intensity}   update={setIntensity}      />} />
    <Wrapper name="Cast Shadows" child={<Toggle                 scope="Direcitonal Light" label="cast"     value={castShadows} update={toggleCastShadows} />} />

    <Color scope="Directional Light" value={color} update={setColor} />

    <Object scope="Directional Light" name="Rotation" fields={rotationFields} />

    <button
      className="btn btn-primary"
      onClick={doCreate}
    >Create</button>
  </form>
}

export default Component
