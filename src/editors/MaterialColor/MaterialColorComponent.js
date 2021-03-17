import React, { useState } from 'react'

import World from '../../ecs'

import Slider from '../../ui/Slider/SliderComponent'

const common = {
  field: 'Material'
}

const updateTarget = (component, channel, value) => {
  component.target[channel] = value

  component.update()
}

const Component = ({ entity }) => {
  const { material } = World.getEntity(entity).c

  const [r, setR] = useState(material.r)
  const [g, setG] = useState(material.g)
  const [b, setB] = useState(material.b)

  return <div className="material editor">
    <h3>Material</h3>
    <Slider label="Red"   value={r} update={val => { setR(val); updateTarget(material, 'r', val) }} {...common} />
    <Slider label="Green" value={g} update={val => { setG(val); updateTarget(material, 'g', val) }} {...common} />
    <Slider label="Blue"  value={b} update={val => { setB(val); updateTarget(material, 'b', val) }} {...common} />
  </div>
}

export default Component
