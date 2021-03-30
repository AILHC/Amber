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

  let resized = { ...segments }

  resized[axis] = value

  const updated = new BoxGeometry(
    size.width,
    size.height,
    size.depth,
    resized.wide,
    resized.high,
    resized.deep,
  )

  segments.target.children[0].geometry.dispose()
  segments.target.children[1].geometry.dispose()

  segments[axis] = value

  segments.target.children[0].geometry = updated
  segments.target.children[1].geometry = new WireframeGeometry(updated)

  segments.update()
}

const common = {
  max: 10,
  min:  1,
  step: 1,

  type:  'Slider',
  scope: 'Segments',

  updateTarget: (entity, axis, value) => {
    doUpdateTarget(entity, axis, value)
    autoNameIfPlaceholder('Box', entity)
  },
}

const Component = ({ entity }) => {
  const { segments } = World.getEntity(entity).c

  let [wide, setWide] = useState(undefined)
  let [high, setHigh] = useState(undefined)
  let [deep, setDeep] = useState(undefined)

  useMemo(() => {
    wide = segments.wide
    high = segments.high
    deep = segments.deep

    setWide(wide)
    setHigh(high)
    setDeep(deep)
  }, [entity, wide, high, deep])

  return <Object
    label="Segments"
    fields={[
      axis(entity, 'wide', wide, setWide, common),
      axis(entity, 'high', high, setHigh, common),
      axis(entity, 'deep', deep, setDeep, common),
    ]}
  />
}

export default Component
