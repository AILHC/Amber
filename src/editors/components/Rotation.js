import React, { useState, useMemo } from 'react'

import World from '../../ecs'

import Object from '../../ui/Object'

const updateTarget = (entity, axis, value) => {
  const { rotation } = World.getEntity(entity).c

  const denormalized = ((value - 50) * .02) * Math.PI

  rotation[axis]        = denormalized
  rotation.target[axis] = denormalized

  rotation.update()
}

const convert = val => `${Math.round(((val - 50) * 2) * 1.8)}°`

const axis = (entity, label, value, fn) => ({
  label,
  value,
  max:  Math.PI,
  min: -Math.PI,
  type: 'NormalizedSlider',
  scope: 'Rotation',
  displayLabel: true,
  displayValue: convert(value),
  update: val => {
    fn(val)
    updateTarget(entity, label, val)
  },
})

const Component = ({ entity }) => {
  const { rotation } = World.getEntity(entity).c

  let [x, setX] = useState(50)
  let [y, setY] = useState(50)
  let [z, setZ] = useState(50)

  useMemo(() => {
    x = (((rotation.x / Math.PI) * .5) + .5) * 100
    y = (((rotation.y / Math.PI) * .5) + .5) * 100
    z = (((rotation.z / Math.PI) * .5) + .5) * 100

    setX(x)
    setY(y)
    setZ(z)
  }, [entity, x, y, z])

  const rotationFields = [
    axis(entity, 'x', x, setX),
    axis(entity, 'y', y, setY),
    axis(entity, 'z', z, setZ),
  ]

  return <Object label="Rotation" fields={rotationFields} summaryConverter={convert} />
}

export default Component
