import React, {
  useMemo,
  useState,
  useEffect,
} from 'react'

import World, {
  onRotate,
  autoNameIfPlaceholder,
} from '../../../env'

import Object from '../../../ui/Object'

import { axis } from '../helpers'

import updateECS from './updateECS'
import convert   from './convert'
import common    from './common'

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
    entity={entity}
    summaryConverter={convert}
    fields={[
      axis('x', x, setX, common(entity, rotation, x, type)),
      axis('y', y, setY, common(entity, rotation, y, type)),
      axis('z', z, setZ, common(entity, rotation, z, type)),
    ]}
  />
}

export default Rotation
