import React from 'react'

import Slider from '../../ui/Slider/SliderComponent'

const common = {
  field: 'Rotation Speed',
  min: 0,
  max: 100,
}

const Component = ({
  rotateX,
  rotateY,
  setRotateX,
  setRotateY,
}) =>
  <div className="rotation editor">
    <h3>Rotation Speed</h3>
    <Slider label="X" value={rotateX} update={setRotateX} {...common} />
    <Slider label="Y" value={rotateY} update={setRotateY} {...common} />
  </div>

export default Component
