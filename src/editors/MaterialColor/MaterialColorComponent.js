import React, { useState } from 'react'

import World from '../../ecs/Ape'

import Slider from '../../ui/Slider/SliderComponent'

const common = {
  field: 'Material'
}

const Component = ({ entity }) => {
  const material = World.getEntity(entity).getOne('MaterialColor')

  const [r, setR] = useState(material.r)
  const [g, setG] = useState(material.g)
  const [b, setB] = useState(material.b)

  return <div className="material editor">
    <h3>Material</h3>
    <Slider label="Red"   value={r} update={val => { setR(val); material.update({ r: val, g,      b      }) }} {...common} />
    <Slider label="Green" value={g} update={val => { setG(val); material.update({ r,      g: val, b      }) }} {...common} />
    <Slider label="Blue"  value={b} update={val => { setB(val); material.update({ r,      g,      b: val }) }} {...common} />
  </div>
}

export default Component
