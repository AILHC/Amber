import React, { useEffect, useState, useMemo } from 'react'

import World, {
  onScale,
  autoNameIfPlaceholder,
} from '../../env'

import Object from '../../ui/Object'

import { axis } from './helpers'

const updateECS = (shadowVolume, value) => {
  shadowVolume.width  = value.x * 50
  shadowVolume.height = value.z * 50
  shadowVolume.depth  = value.y * 50

  shadowVolume.update()
}

const doUpdateTarget = (entity, shadowVolume, axis, value) => {
  const { helpers } = World.getEntity(entity).c

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

const common = (entity, shadowVolume, type) => ({
  max: 500,
  min:   4,

  type:  'Slider',
  scope: 'ShadowVolume',

  updateTarget: (axis, value) => {
    doUpdateTarget(entity, shadowVolume, axis, value)
    autoNameIfPlaceholder(`${type}Light`, entity)
  },
})

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
