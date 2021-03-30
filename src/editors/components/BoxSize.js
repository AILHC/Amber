import React, { useState, useMemo } from 'react'

import {
  BoxGeometry,
  WireframeGeometry,
} from 'three'

import World, { autoNameIfPlaceholder } from '../../env'

import Object from '../../ui/Object'

import { axis } from './helpers'

const doUpdateTarget = (entity, axis, value) => {
  const {
    size,
    segments,
  } = World.getEntity(entity).c

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

const common = {
  max: 10,
  min:  1,

  type:  'Slider',
  scope: 'Size',

  updateTarget: (entity, axis, value) => {
    doUpdateTarget(entity, axis, value)
    autoNameIfPlaceholder('Box', entity)
  },
}

const Component = ({ entity }) => {
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
  }, [entity, width, height, depth])

  return <Object
    label="Size"
    fields={[
      axis(entity, 'width',  width,  setWidth,  common),
      axis(entity, 'height', height, setHeight, common),
      axis(entity, 'depth',  depth,  setDepth,  common),
    ]}
  />
}

export default Component
