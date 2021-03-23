import React, { useState, useMemo } from 'react'

import {
  Vector3,
  Quaternion,
} from 'three'

import World from '../../ecs'

import Object from '../../ui/Object'

const common = {
  scope: 'Rotation',
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

const convert = val => `${Math.round(toDegrees(val))}°`

const Component = ({ entity }) => {
  const {
    helper,
    rotation,
  } = World.getEntity(entity).c

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

  const rotationFields = [{
    type: 'NormalizedSlider',
    label: 'x',
    value: x,
    displayValue: convert(x),
    update: val => {
      setX(val)
      updateTarget(rotation, 'x', val)
      helper.value.update()
    },
    ...common,
  }, {
    type: 'NormalizedSlider',
    label: 'y',
    value: y,
    displayValue: convert(y),
    update: val => {
      setY(val)
      updateTarget(rotation, 'y', val)
      helper.value.update()
    },
    ...common,
  }, {
    type: 'NormalizedSlider',
    label: 'z',
    value: z,
    displayValue: convert(z),
    update: val => {
      setZ(val)
      updateTarget(rotation, 'z', val)
      helper.value.update()
    },
    ...common,
  }]

  return <Object name="Rotation" fields={rotationFields} summaryConverter={convert} />
}

export default Component
