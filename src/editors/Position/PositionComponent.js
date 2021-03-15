import React from 'react'

import Slider from '../../ui/Slider/SliderComponent'

const common = {
  field: 'Position',
  min: -5,
  max:  5,
}

const Component = ({
  x,
  y,
  z,
  setX,
  setY,
  setZ,
}) =>
  <div className="position editor">
    <h3>Position</h3>
    <Slider label="X" value={x} update={setX} {...common} />
    <Slider label="Y" value={y} update={setY} {...common} />
    <Slider label="Z" value={z} update={setZ} {...common} />
  </div>

export default Component
