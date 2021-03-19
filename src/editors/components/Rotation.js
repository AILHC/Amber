import React, { useState, useMemo } from 'react'

import World from '../../ecs'

import Object from '../../ui/Object'

const common = {
  scope: 'Rotation',
  min: -Math.PI,
  max:  Math.PI,
}

const updateTarget = (component, axis, value) => {
  component[axis] = value
  component.target[axis] = value

  component.update()
}

const Component = ({ entity }) => {
  const { rotation } = World.getEntity(entity).c

  let [x, setX] = useState(undefined)
  let [y, setY] = useState(undefined)
  let [z, setZ] = useState(undefined)

  useMemo(() => {
    x = rotation.x
    y = rotation.y
    z = rotation.z

    setX(x)
    setY(y)
    setZ(z)
  }, [entity, x, y, z])

  const rotationFields = [{
    type: 'Slider',
    label: 'X',
    value: x,
    update: val => { setX(val); updateTarget(rotation, 'x', val) },
    ...common,
  }, {
    type: 'Slider',
    label: 'Y',
    value: y,
    update: val => { setY(val); updateTarget(rotation, 'y', val) },
    ...common,
  }, {
    type: 'Slider',
    label: 'Z',
    value: z,
    update: val => { setZ(val); updateTarget(rotation, 'z', val) },
    ...common,
  }]

  return <Object name="Rotation" fields={rotationFields} />
}

export default Component
