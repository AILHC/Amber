import React, { useState } from 'react'

import World from '../../ecs/Ape'

import Slider from '../../ui/Slider/SliderComponent'

const common = {
  field: 'Position',
  min: -5,
  max:  5,
}

const Component = ({ entity }) => {
  const { position } = World.getEntity(entity).c

  const [x, setX] = useState(position.x)
  const [y, setY] = useState(position.y)
  const [z, setZ] = useState(position.z)

  return <div className="position editor">
    <h3>Position</h3>
    <Slider label="X" value={x} update={val => { setX(val); position.update({ x: val, y,      z      }) }} {...common} />
    <Slider label="Y" value={y} update={val => { setY(val); position.update({ x,      y: val, z      }) }} {...common} />
    <Slider label="Z" value={z} update={val => { setZ(val); position.update({ x,      y,      z: val }) }} {...common} />
  </div>
}

export default Component
