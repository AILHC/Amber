import React from 'react'

import Text   from '../../ui/Text'
import Color  from '../../ui/Color'
import Object from '../../ui/Object'

import InlineNormalizedSlider from '../../ui/InlineNormalizedSlider'

import Wrapper from '../../helpers/FieldsetWrapper'

const rotationCommon = {
  scope: 'Directional Light'
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
  setRotation,
  setIntensity,
  setLookAtPosition,
}) => {
  const rotationFields = [{
    type: 'NormalizedSlider',
    label: 'x',
    value: rotation.x,
    displayValue: convert(rotation.x),
    update: val => {
      setLookAtPosition(/* Somthing */)
      setRotation({ ...rotation, x: val })
    },
    ...rotationCommon,
  }, {
    type: 'NormalizedSlider',
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
    <Wrapper name="Name"      child={<Text                   scope="Directional Light" name="name"      value={id}        update={setId}        />} />
    <Wrapper name="Intensity" child={<InlineNormalizedSlider scope="Direcitonal Light" name="intensity" value={intensity} update={setIntensity} />} />

    <Color scope="Directional Light" value={color} update={setColor} />

    <Object scope="Directional Light" name="Rotation" fields={rotationFields} />

    <button
      className="btn btn-primary"
      onClick={e => { create(id, color, rotation, lookAt, intensity); e.preventDefault() }}
    >Create</button>
  </form>
}

export default Component
