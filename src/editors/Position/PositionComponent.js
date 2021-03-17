import React, { useState } from 'react'

import World from '../../ecs/Ape'

import Slider from '../../ui/Slider/SliderComponent'

const common = {
  field: 'Position',
  min: -5,
  max:  5,
}

const updateTarget = (component, axis, value) => {
  component.target[axis] = value

  component.update()
}

const Component = ({ entity }) => {
  const { position } = World.getEntity(entity).c

  const [x, setX] = useState(position.x)
  const [y, setY] = useState(position.y)
  const [z, setZ] = useState(position.z)

  return <div className="position editor">
    <h3>Position</h3>
    <Slider label="X" value={x} update={val => { setX(val); updateTarget(position, 'x', val) }} {...common} />
    <Slider label="Y" value={y} update={val => { setY(val); updateTarget(position, 'y', val) }} {...common} />
    <Slider label="Z" value={z} update={val => { setZ(val); updateTarget(position, 'z', val) }} {...common} />
  </div>
}

export default Component
