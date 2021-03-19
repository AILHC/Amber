import React, { useState, useMemo } from 'react'

import World from '../../ecs'

import Toggle from '../../ui/Toggle'

const updateTarget = (component, value) => {
  component.value = value
  component.target.castShadow = value

  component.update()
}

const Component = ({ entity }) => {
  const { castShadows } = World.getEntity(entity).c

  let [cast, setCast] = useState(castShadows.value)

  useMemo(() => {
    cast = castShadows.value

    setCast(cast)
  }, [entity, cast])

  return <Toggle
    scope="Cast Shadows"
    name="value"
    checked={cast} toggle={() => { setCast(!cast); updateTarget(castShadows, !cast) }}
  />
}

export default Component
