import React, { useState, useMemo } from 'react'

import {
  BoxGeometry,
  WireframeGeometry,
} from 'three'

import World, { autoNameIfPlaceholder } from '../../env'

import Object from '../../ui/Object'

import { axis } from './helpers'

const doUpdateTarget = (entity, size, axis, value) => {
  const { segments } = World.getEntity(entity).c

  let resized = { ...size }

  resized[axis] = value

  const updated = new BoxGeometry(
    resized.width,
    resized.height,
    resized.depth,

    segments.wide,
    segments.high,
    segments.deep,
  )

  size.target.children[0].geometry.dispose()
  size.target.children[1].geometry.dispose()

  size[axis] = value

  size.target.children[0].geometry = updated
  size.target.children[1].geometry = new WireframeGeometry(updated)

  size.update()
}

const common = (entity, size) => ({
  max: 10,
  min:  1,

  type:  'Slider',
  scope: 'Size',

  updateTarget: (axis, value) => {
    doUpdateTarget(entity, size, axis, value)
    autoNameIfPlaceholder('Box', entity)
  },
})

const BoxSize = ({ entity }) => {
  const { size } = World.getEntity(entity).c

  let [width,  setWidth ] = useState(undefined)
  let [height, setHeight] = useState(undefined)
  let [depth,  setDepth ] = useState(undefined)

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
    fields={[
      axis('width',  width,  setWidth,  common(entity, size)),
      axis('height', height, setHeight, common(entity, size)),
      axis('depth',  depth,  setDepth,  common(entity, size)),
    ]}
  />
}

export default BoxSize
