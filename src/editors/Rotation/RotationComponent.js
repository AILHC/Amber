import React, { useState } from 'react'

import World from '../../ecs/Ape'

import Slider from '../../ui/Slider/SliderComponent'

const common = {
  field: 'Rotation Speed',
  min: 0,
  max: 100,
}

const Component = ({ entity }) => {
  const { rotation } = World.getEntity(entity).c

  const [x, setX] = useState(rotation.x)
  const [y, setY] = useState(rotation.y)

  return <div className="rotation editor">
    <h3>Rotation Speed</h3>
    <Slider label="X" value={x} update={val => { setX(val); rotation.update({ x: val, y,      z: 0 }) }} {...common} />
    <Slider label="Y" value={y} update={val => { setY(val); rotation.update({ x,      y: val, z: 0 }) }} {...common} />
  </div>
}

export default Component
