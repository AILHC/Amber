import React from 'react'

import Text   from '../../ui/Text'
import Color  from '../../ui/Color'
import Object from '../../ui/Object'
import Toggle from '../../ui/Toggle'

import InlineNormalizedSlider from '../../ui/InlineNormalizedSlider'

import Wrapper from '../../helpers/FieldsetWrapper'

const rotationCommon = {
  type: 'NormalizedSlider',
  scope: 'Spot Light',
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

  return <form className="spot-light creator">
    <Wrapper label="Name"         child={<Text                   scope="Spot Light" label="name"      value={id}          update={setId}             />} />
    <Wrapper label="Intensity"    child={<InlineNormalizedSlider scope="Spot Light" label="intensity" value={intensity}   update={setIntensity}      />} />
    <Wrapper label="Cast Shadows" child={<Toggle                 scope="Spot Light" label="cast"      value={castShadows} update={toggleCastShadows} />} />

    <Color scope="Spot Light" value={color} update={setColor} />

    <Object scope="Spot Light" label="Rotation" fields={rotationFields} summaryConverter={convert} />

    <button
      className="btn btn-primary"
      onClick={doCreate}
    >Create</button>
  </form>
}

export default Component
