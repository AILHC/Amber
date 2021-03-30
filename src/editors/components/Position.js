import React, { useState, useMemo } from 'react'

import World, { autoNameIfPlaceholder } from '../../env'

import Object from '../../ui/Object'

import { axis } from './helpers'

const doUpdateTarget = (entity, axis, value) => {
  const { position } = World.getEntity(entity).c

  position[axis]        = value
  position.target[axis] = value

  position.update()
}

const common = type => ({
  max:  5,
  min: -5,

  type:  'Slider',
  scope: 'Position',

  updateTarget: (entity, axis, value) => {
    doUpdateTarget(entity, axis, value)
    autoNameIfPlaceholder(type, entity)
  },
})

const Component = ({
  type,
  entity,
}) => {
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

  return <Object
    label="Position"
    fields={[
      axis(entity, 'x', x, setX, common(type)),
      axis(entity, 'y', y, setY, common(type)),
      axis(entity, 'z', z, setZ, common(type)),
    ]}
  />
}

export default Component
