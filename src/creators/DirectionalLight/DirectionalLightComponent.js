import React from 'react'

import { SketchPicker } from 'react-color'

import Slider from '../../ui/Slider/SliderComponent'

const Component = ({
  color,
  create,
  setColor,
  intensity,
  setIntensity,
}) =>
  <div>
    <h3>Color</h3>
    <SketchPicker color={color} onChange={setColor} />
    <h3>Intensity</h3>
    <Slider field="Directional Light" label="intensity" value={intensity} update={setIntensity} />
    <button onClick={() => create(color, intensity)}>Create</button>
  </div>

export default Component
