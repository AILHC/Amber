import React, { useEffect, useState, useMemo } from 'react'

import World, {
  onTranslate,
  autoNameIfPlaceholder,
} from '../../env'

import Object from '../../ui/Object'

import { axis } from './helpers'

const updateECS = (position, value) => {
  position.x = value.x
  position.y = value.y
  position.z = value.z

  position.update()
}

const doUpdateTarget = (position, axis, value) => {
  position[axis]        = value
  position.target[axis] = value

  position.update()
}

const common = (entity, position, type) => ({
  max:  5,
  min: -5,

  type:  'Slider',
  scope: 'Position',

  updateTarget: (axis, value) => {
    doUpdateTarget(position, axis, value)
    autoNameIfPlaceholder(type, entity)
  },
})

const Position = ({
  type,
  entity,
}) => {
  const { position } = World.getEntity(entity).c

  let [x, setX] = useState(undefined)
  let [y, setY] = useState(undefined)
  let [z, setZ] = useState(undefined)

  useEffect(() => {
    onTranslate(val => {
      setX(val.x)
      setY(val.y)
      setZ(val.z)

      updateECS(position, val)

      autoNameIfPlaceholder(type, entity)
    })
  }, [entity])

  useMemo(() => {
    x = position.x
    y = position.y
    z = position.z

    setX(x)
    setY(y)
    setZ(z)
  }, [entity])

  return <Object
    label="Position"
    entity={entity}
    fields={[
      axis('x', x, setX, common(entity, position, type)),
      axis('y', y, setY, common(entity, position, type)),
      axis('z', z, setZ, common(entity, position, type)),
    ]}
  />
}

export default Position
