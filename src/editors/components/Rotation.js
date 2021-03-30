import React, { useState, useMemo } from 'react'

import World, { autoNameIfPlaceholder } from '../../env'

import Object from '../../ui/Object'

import { axis } from './helpers'

const doUpdateTarget = (entity, axis, value) => {
  const { rotation } = World.getEntity(entity).c

  const denormalized = ((value - 50) * .02) * Math.PI

  rotation[axis]        = denormalized
  rotation.target[axis] = denormalized

  rotation.update()
}

const convert = val => `${Math.round(((val - 50) * 2) * 1.8)}°`

const common = (val, type) => ({
  max:  Math.PI,
  min: -Math.PI,

  type:  'NormalizedSlider',
  scope: 'Rotation',

  displayLabel: true,
  displayValue: convert(val),

  updateTarget: (entity, axis, value) => {
    doUpdateTarget(entity, axis, value)
    autoNameIfPlaceholder(type, entity)
  },
})

const Component = ({
  type,
  entity,
}) => {
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

  return <Object
    label="Rotation"
    summaryConverter={convert}
    fields={[
      axis(entity, 'x', x, setX, common(x, type)),
      axis(entity, 'y', y, setY, common(y, type)),
      axis(entity, 'z', z, setZ, common(z, type)),
    ]}
  />
}

export default Component
