import React, { useState, useMemo } from 'react'

import World from '../../ecs/Ape'

import Slider from '../../ui/Slider/SliderComponent'

const common = {
  field: 'Rotation Speed',
  min: 0,
  max: 100,
}

const Component = ({ entity }) => {
  const { rotation } = World.getEntity(entity).c

  let [x, setX] = useState(undefined)
  let [y, setY] = useState(undefined)

  useMemo(() => {
    x = rotation.x
    y = rotation.y

    setX(x)
    setY(y)
  }, [entity])

  return <div className="rotation editor">
    <h3>Rotation Speed</h3>
    <Slider label="X" value={x} update={val => { setX(val); rotation.update({ x: val, y,      z: 0 }) }} {...common} />
    <Slider label="Y" value={y} update={val => { setY(val); rotation.update({ x,      y: val, z: 0 }) }} {...common} />
  </div>
}

export default Component
