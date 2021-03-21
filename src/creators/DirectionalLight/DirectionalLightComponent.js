import React from 'react'

import Text   from '../../ui/Text'
import Color  from '../../ui/Color'

import InlineNormalizedSlider from '../../ui/InlineNormalizedSlider'

import Wrapper from '../../helpers/FieldsetWrapper'

const Component = ({
  id,
  color,
  setId,
  create,
  setColor,
  intensity,
  setIntensity,
}) => {
  return <form className="direcitonal-light creator">
    <Wrapper name="Name"      child={<Text                   scope="Directional Light" name="name"      value={id}        update={setId}        />} />
    <Wrapper name="Intensity" child={<InlineNormalizedSlider scope="Direcitonal Light" name="intensity" value={intensity} update={setIntensity} />} />
    <Color scope="Directional Light" value={color} update={setColor} />

    <button
      className="btn btn-primary"
      onClick={e => { create(id, color, intensity); e.preventDefault() }}
    >Create</button>
  </form>
}

export default Component
