import React, { useState, useMemo } from 'react'

import {
  Vector3,
  Quaternion,
} from 'three'

import World, { autoNameIfPlaceholder } from '../../env'

import Object from '../../ui/Object'

import { axis } from './helpers'

const common = (val, type) => ({
  type:  'NormalizedSlider',
  scope: 'Rotation',

  displayLabel: true,
  displayValue: convert(val),

  updateTarget: (entity, axis, value) => {
    doUpdateTarget(entity, axis, value)
    autoNameIfPlaceholder(`${type}Light`, entity)
  },
})

const toDegrees = val => (val - 50) * 3.6
const toRadians = val => val * (Math.PI / 180)

const doUpdateTarget = (entity, axis, value) => {
  const { rotation } = World.getEntity(entity).c

  const current = toDegrees(rotation[axis])
  const next    = toDegrees(value)
  const radians = toRadians(current - next)

  let rotateAround = new Vector3()

  rotateAround[axis] = 1

  const quaternion = new Quaternion()
  quaternion.setFromAxisAngle(rotateAround, radians)

  rotation.target.position.applyQuaternion(quaternion)

  rotation[axis] = value

  rotation.target.updateMatrixWorld()

  rotation.update()
}

const convert = val => `${Math.round(toDegrees(val))}°`

const Component = ({
  type,
  entity,
}) => {
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
    axis(entity, 'x', x, setX, common(x, type)),
    axis(entity, 'y', y, setY, common(y, type)),
    axis(entity, 'z', z, setZ, common(z, type))
  ]

  return <Object
    label="Rotation"
    fields={rotationFields}
    summaryConverter={convert}
  />
}

export default Component
