import React, { useState, useMemo } from 'react'

import {
  PlaneGeometry,
  WireframeGeometry,
} from 'three'

import World, { autoNameIfPlaceholder } from '../../env'

import Object from '../../ui/Object'

import { axis } from './helpers'

const doUpdateTarget = (entity, segments, axis, value) => {
  const { size } = World.getEntity(entity).c

  let resized = { ...segments }

  resized[axis] = value

  const updated = new PlaneGeometry(
    size.width,
    size.height,

    resized.wide,
    resized.high,
  )

  segments.target.children[0].geometry.dispose()
  segments.target.children[1].geometry.dispose()

  segments[axis] = value

  segments.target.children[0].geometry = updated
  segments.target.children[1].geometry = new WireframeGeometry(updated)

  segments.update()
}

const common = (entity, segments) => ({
  max: 10,
  min:  1,
  step: 1,

  type:  'Slider',
  scope: 'Segments',

  updateTarget: (axis, value) => {
    doUpdateTarget(entity, segments, axis, value)
    autoNameIfPlaceholder('Plane', entity)
  },
})

const PlaneSegments = ({ entity }) => {
  const { segments } = World.getEntity(entity).c

  let [wide, setWide] = useState(undefined)
  let [high, setHigh] = useState(undefined)

  useMemo(() => {
    wide = segments.wide
    high = segments.high

    setWide(wide)
    setHigh(high)
  }, [entity, wide, high])

  return <Object
    label="Segments"
    fields={[
      axis('wide', wide, setWide, common(entity, segments)),
      axis('high', high, setHigh, common(entity, segments)),
    ]}
  />
}

export default PlaneSegments
