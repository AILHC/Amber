import React, { useState, useMemo } from 'react'

import World from '../../ecs/Ape'

import Slider from '../../ui/Slider/SliderComponent'

const common = {
  field: 'Position',
  min: -5,
  max:  5,
}

const updateTarget = (component, axis, value) => {
  component[axis] = value
  component.target[axis] = value

  component.update()
}

const Component = ({ entity }) => {
  const { position } = World.getEntity(entity).c

  let [x, setX] = useState(undefined)
  let [y, setY] = useState(undefined)
  let [z, setZ] = useState(undefined)

  useMemo(() => {
    x = position.x
    y = position.y
    z = position.z

    setX(x)
    setY(y)
    setZ(z)
  }, [entity])

  return <div className="position editor">
    <h3>Position</h3>
    <Slider label="X" value={x} update={val => { setX(val); updateTarget(position, 'x', val) }} {...common} />
    <Slider label="Y" value={y} update={val => { setY(val); updateTarget(position, 'y', val) }} {...common} />
    <Slider label="Z" value={z} update={val => { setZ(val); updateTarget(position, 'z', val) }} {...common} />
  </div>
}

export default Component
