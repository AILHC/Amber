import React, {
  useMemo,
  useState,
  useEffect,
} from 'react'

import World, {
  onScale,
  autoNameIfPlaceholder,
} from '../../../env'

import Object from '../../../ui/Object'

import { axis } from '../helpers'

import updateECS from './updateECS'
import common    from './common'

const ShadowVolume = ({
  type,
  entity,
}) => {
  const { shadowVolume } = World.getEntity(entity).c

  let [width,  setWidth ] = useState(undefined)
  let [height, setHeight] = useState(undefined)
  let [depth,  setDepth ] = useState(undefined)

  useEffect(() => {
    onScale(val => {
      setWidth  (val.x * 50)
      setHeight (val.z * 50)
      setDepth  (val.y * 50)

      updateECS(shadowVolume, val)

      autoNameIfPlaceholder(`${type}Light`, entity)
    })
  }, [entity])

  useMemo(() => {
    width  = shadowVolume.width
    height = shadowVolume.height
    depth  = shadowVolume.depth

    setWidth  (width )
    setHeight (height)
    setDepth  (depth )
  }, [entity])

  return <Object
    label="Volume"
    entity={entity}
    fields={[{
      ...axis('width', width, setWidth, common(entity, shadowVolume, type)),
      step: 2,
    }, {
      ...axis('height', height, setHeight, common(entity, shadowVolume, type)),
      step: 2,
    }, {
      ...axis('depth', depth, setDepth, common(entity, shadowVolume, type)),
      step: 1,
    }]}
  />
}

export default ShadowVolume
