import React, { useEffect, useState, useMemo } from 'react'

import {
  PlaneGeometry,
  WireframeGeometry,
} from 'three'

import World, {
  onScale,
  autoNameIfPlaceholder,
} from '../../env'

import Object from '../../ui/Object'

import { axis } from './helpers'

const updateECS = (size, value) => {
  size.x = value.x
  size.y = value.y

  size.update()
}

const doUpdateTarget = (entity, size, axis, value) => {
  const { segments } = World.getEntity(entity).c

  let resized = { ...size }

  resized[axis] = value

  const updated = new PlaneGeometry(
    resized.width,
    resized.height,

    segments.wide,
    segments.high,
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
    autoNameIfPlaceholder('Plane', entity)
  },
})

const PlaneSize = ({ entity }) => {
  const { size } = World.getEntity(entity).c

  let [width,  setWidth ] = useState(undefined)
  let [height, setHeight] = useState(undefined)

  useEffect(() => {
    onScale(val => {
      setWidth  (val.x)
      setHeight (val.y)

      updateECS(size, val)

      autoNameIfPlaceholder('Plane', entity)
    })
  }, [entity])

  useMemo(() => {
    width  = size.width
    height = size.height

    setWidth  (width )
    setHeight (height)
  }, [entity])

  return <Object
    label="Size"
    entity={entity}
    fields={[
      axis('width',  width,  setWidth,  common(entity, size)),
      axis('height', height, setHeight, common(entity, size)),
    ]}
  />
}

export default PlaneSize
