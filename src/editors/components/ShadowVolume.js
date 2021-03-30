import React, { useState, useMemo } from 'react'

import World, { autoNameIfPlaceholder } from '../../env'

import Object from '../../ui/Object'

import { axis } from './helpers'

const doUpdateTarget = (entity, axis, value) => {
  const {
    helpers,
    shadowVolume,
  } = World.getEntity(entity).c

  const half = value * .5

  if (axis === 'width') {
    shadowVolume[axis] = value

    shadowVolume.target.left  = half - value
    shadowVolume.target.right = half
  }
  else if (axis === 'height') {
    shadowVolume[axis] = value

    shadowVolume.target.top    = half
    shadowVolume.target.bottom = half - value
  }
  else if (axis === 'depth') {
    shadowVolume[axis] = value

    shadowVolume.target.far = value
  }

  shadowVolume.target.updateProjectionMatrix()
  shadowVolume.update()

  for (const h of helpers.value)
    h.update()
}

const common = type => ({
  max: 500,
  min:   4,

  type:  'Slider',
  scope: 'ShadowVolume',

  updateTarget: (entity, axis, value) => {
    doUpdateTarget(entity, axis, value)
    autoNameIfPlaceholder(`${type}Light`, entity)
  },
})

const Component = ({
  type,
  entity,
}) => {
  const { shadowVolume } = World.getEntity(entity).c

  let [width,  setWidth ] = useState(undefined)
  let [height, setHeight] = useState(undefined)
  let [depth,  setDepth ] = useState(undefined)

  useMemo(() => {
    width  = shadowVolume.width
    height = shadowVolume.height
    depth  = shadowVolume.depth

    setWidth  (width )
    setHeight (height)
    setDepth  (depth )
  }, [entity, width, height])

  return <Object
    label="Volume"
    fields={[{
      ...axis(entity, 'width', width, setWidth, common(type)),
      step: 2,
    }, {
      ...axis(entity, 'height', height, setHeight, common(type)),
      step: 2,
    }, {
      ...axis(entity, 'depth', depth, setDepth, common(type)),
      step: 1,
    }]}
  />
}

export default Component
