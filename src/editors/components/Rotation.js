import React, { useEffect, useState, useMemo } from 'react'

import World, {
  onRotate,
  autoNameIfPlaceholder,
} from '../../env'

import Object from '../../ui/Object'

import { axis } from './helpers'

const updateECS = (rotation, value) => {
  rotation.x = value._x
  rotation.y = value._y
  rotation.z = value._z

  rotation.update()
}

const doUpdateTarget = (rotation, axis, value) => {
  const denormalized = (((value - 50) * .02) * Math.PI)

  rotation[axis]        = denormalized
  rotation.target[axis] = denormalized
}

const convert = val => `${Math.round(((val - 50) * 2) * 1.8)}°`

const common = (entity, rotation, val, type) => ({
  max:  Math.PI,
  min: -Math.PI,

  type:  'NormalizedSlider',
  scope: 'Rotation',

  displayLabel: true,
  displayValue: convert(val),

  updateTarget: (axis, value) => {
    doUpdateTarget(rotation, axis, value)
    autoNameIfPlaceholder(type, entity)
  },
})

const Rotation = ({
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

      autoNameIfPlaceholder(type, entity)
    })
  }, [entity])

  useMemo(() => {
    x = (((rotation.x / Math.PI) * .5) + .5) * 100
    y = (((rotation.y / Math.PI) * .5) + .5) * 100
    z = (((rotation.z / Math.PI) * .5) + .5) * 100

    setX(x)
    setY(y)
    setZ(z)
  }, [entity])

  return <Object
    label="Rotation"
    summaryConverter={convert}
    fields={[
      axis('x', x, setX, common(entity, rotation, x, type)),
      axis('y', y, setY, common(entity, rotation, y, type)),
      axis('z', z, setZ, common(entity, rotation, z, type)),
    ]}
  />
}

export default Rotation
