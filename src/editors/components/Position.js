import React, { useState, useMemo } from 'react'

import World from '../../ecs'

import Object from '../../ui/Object'

const common = {
  scope: 'Position',
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
  }, [entity, x, y, z])

  const positionFields = [{
    type: 'Slider',
    label: 'X',
    value: x,
    update: val => { setX(val); updateTarget(position, 'x', val) },
    ...common,
  }, {
    type: 'Slider',
    label: 'Y',
    value: y,
    update: val => { setY(val); updateTarget(position, 'y', val) },
    ...common,
  }, {
    type: 'Slider',
    label: 'Z',
    value: z,
    update: val => { setZ(val); updateTarget(position, 'z', val) },
    ...common,
  }]

  return <Object name="Position" fields={positionFields} />
}

export default Component
