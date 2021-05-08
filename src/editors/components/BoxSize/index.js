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

const BoxSize = ({ entity }) => {
  const { size } = World.getEntity(entity).c

  let [width,  setWidth ] = useState(undefined)
  let [height, setHeight] = useState(undefined)
  let [depth,  setDepth ] = useState(undefined)

  useEffect(() => {
    onScale(val => {
      setWidth  (val.x)
      setHeight (val.y)
      setDepth  (val.z)

      updateECS(size, val)

      autoNameIfPlaceholder('Box', entity)
    })
  }, [entity])

  useMemo(() => {
    width  = size.width
    height = size.height
    depth  = size.depth

    setWidth  (width )
    setHeight (height)
    setDepth  (depth )
  }, [entity])

  return <Object
    label="Size"
    entity={entity}
    fields={[
      axis('width',  width,  setWidth,  common(entity, size)),
      axis('height', height, setHeight, common(entity, size)),
      axis('depth',  depth,  setDepth,  common(entity, size)),
    ]}
  />
}

export default BoxSize
