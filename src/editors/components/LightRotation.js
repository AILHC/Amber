import React, { useState, useMemo, useEffect } from 'react'

import {
  Vector3,
  Quaternion,
} from 'three'

import World, {
  onRotate,
  autoNameIfPlaceholder,
} from '../../env'

import Object from '../../ui/Object'

import { axis } from './helpers'

const common = (entity, rotation, val, type) => ({
  max:  Math.PI,
  min: -Math.PI,

  type:  'NormalizedSlider',
  scope: 'Rotation',

  displayLabel: true,
  displayValue: convert(val),

  updateTarget: (axis, value) => {
    doUpdateTarget(rotation, axis, value)
    autoNameIfPlaceholder(`${type}Light`, entity)
  },
})

const toDegrees = val => (val - 50) * 3.6
const toRadians = val => val * (Math.PI / 180)

const updateECS = (rotation, value) => {
  rotation.x = value._x
  rotation.y = value._y
  rotation.z = value._z

  rotation.update()
}

const doUpdateTarget = (rotation, axis, value) => {
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

const LightRotation = ({
  type,
  entity,
}) => {
  const { rotation } = World.getEntity(entity).c

  let [x, setX] = useState(50)
  let [y, setY] = useState(50)
  let [z, setZ] = useState(50)

  useEffect(() => {
    onRotate(val => {
      setX((((val._x / Math.PI) * .5) + .5) * 100)
      setY((((val._y / Math.PI) * .5) + .5) * 100)
      setZ((((val._z / Math.PI) * .5) + .5) * 100)

      updateECS(rotation, val)

      autoNameIfPlaceholder(`${type}Light`, entity)
    })
  }, [entity])

  useMemo(() => {
    x = rotation.x
    y = rotation.y
    z = rotation.z

    setX(x)
    setY(y)
    setZ(z)
  }, [entity])

  const rotationFields = [
    axis('x', x, setX, common(entity, rotation, x, type)),
    axis('y', y, setY, common(entity, rotation, y, type)),
    axis('z', z, setZ, common(entity, rotation, z, type)),
  ]

  return <Object
    label="Rotation"
    fields={rotationFields}
    summaryConverter={convert}
  />
}

export default LightRotation
