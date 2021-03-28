import React, { useState, useMemo } from 'react'

import World from '../../ecs'

import Object from '../../ui/Object'

const common = {
  min:      4,
  max:    500,
  step:     2,
  type:  'Slider',
  scope: 'ShadowVolume',
}

const updateTarget = (entity, axis, value) => {
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

const Component = ({ entity }) => {
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

  const volumeFields = [{
    ...common,
    label: 'width',
    value:  width,
    update: val => {
      setWidth(val)
      updateTarget(entity, 'width', val)
    },
  }, {
    ...common,
    label: 'height',
    value:  height,
    update: val => {
      setHeight(val)
      updateTarget(entity, 'height', val)
    },
  }, {
    ...common,
    step:   1,
    label: 'depth',
    value:  depth,
    update: val => {
      setDepth(val)
      updateTarget(entity, 'depth', val)
    },
  }]

  return <Object label="Volume" fields={volumeFields} />
}

export default Component
