import React, { useState, useMemo } from 'react'

import {
  Vector3,
  Quaternion,
} from 'three'

import World from '../../ecs'

import Object from '../../ui/Object'

const common = {
  type:        'NormalizedSlider',
  scope:       'Rotation',
  displayLabel: true,
}

const toDegrees = val => (val - 50) * 3.6
const toRadians = val => val * (Math.PI / 180)

const updateTarget = (component, axis, value) => {
  const current = toDegrees(component[axis])
  const next    = toDegrees(value)
  const radians = toRadians(current - next)

  let rotateAround = new Vector3()

  rotateAround[axis] = 1

  const quaternion = new Quaternion()
  quaternion.setFromAxisAngle(rotateAround, radians)

  component.target.position.applyQuaternion(quaternion)

  component[axis] = value

  component.target.updateMatrixWorld()

  component.update()
}

const doUpdate = (entity, fn, axis) => val => {
  const {
    helper,
    rotation,
  } = World.getEntity(entity).c

  fn(val)
  updateTarget(rotation, axis, val)
  helper.value.forEach(h => h.update())
}

const axis = (entity, label, value, fn) => ({
  ...common,
  label,
  value,
  displayValue: convert(value),
  update: doUpdate(entity, fn, label),
})

const convert = val => `${Math.round(toDegrees(val))}°`

const Component = ({ entity }) => {
  const { rotation } = World.getEntity(entity).c

  let [x, setX] = useState(50)
  let [y, setY] = useState(50)
  let [z, setZ] = useState(50)

  useMemo(() => {
    x = rotation.x
    y = rotation.y
    z = rotation.z

    setX(x)
    setY(y)
    setZ(z)
  }, [entity, x, y, z])

  const rotationFields = [
    axis(entity, 'x', x, setX),
    axis(entity, 'y', y, setY),
    axis(entity, 'z', z, setZ)
  ]

  return <Object label="Rotation" fields={rotationFields} summaryConverter={convert} />
}

export default Component
