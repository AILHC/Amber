import React, { useState, useMemo } from 'react'

import Color from '../../ui/Color'

import World from '../../ecs'

const updateTarget = (component, value) => {
  component.r = value.r
  component.g = value.g
  component.b = value.b

  component.target.r = value.r / 255
  component.target.g = value.g / 255
  component.target.b = value.b / 255

  component.update()
}

const Component = ({ entity }) => {
  const { color } = World.getEntity(entity).c

  let [rgb, setRGB] = useState(undefined)

  useMemo(() => {
    rgb = color

    setRGB(rgb)
  }, [entity, rgb])

  return <Color
    scope={entity}
    value={rgb}
    update={val => { setRGB(val); updateTarget(color, val) }}
  />
}

export default Component
