import React from 'react'

import { SketchPicker } from 'react-color'

import Slider from '../../ui/Slider/SliderComponent'

const Component = ({
  id,
  color,
  setId,
  create,
  setColor,
  intensity,
  setIntensity,
}) =>
  <div>
    <h3>ID</h3>
    <input type="text" value={id} placeholder="Give this Direcitonal Light a name" onChange={e => setId(e.target.value)} />
    <h3>Color</h3>
    <SketchPicker color={color} onChange={setColor} />
    <h3>Intensity</h3>
    <Slider field="Directional Light" label="intensity" value={intensity} update={setIntensity} />
    <button onClick={() => create(id, color, intensity)}>Create</button>
  </div>

export default Component
