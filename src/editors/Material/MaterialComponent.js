import React from 'react'

import Slider from '../../ui/Slider/SliderComponent'

const common = {
  field: 'Material'
}

const Component = ({
  red,
  green,
  blue,
  kind,
  setRed,
  setGreen,
  setBlue,
  setKind,
}) =>
  <div className="material editor">
    <h3>Material</h3>
    <Slider label="Red"   value={red}   update={setRed}   {...common} />
    <Slider label="Green" value={green} update={setGreen} {...common} />
    <Slider label="Blue"  value={blue}  update={setBlue}  {...common} />
  </div>

export default Component
