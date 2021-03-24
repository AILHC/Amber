import React, { useState, useMemo } from 'react'

import World from '../../ecs'

import Toggle from '../../ui/Toggle'

const updateTarget = (component, value) => {
  component.cast = value
  component.target.castShadow = value

  component.update()
}

const Component = ({ entity, showLabel = false }) => {
  const { shadows } = World.getEntity(entity).c

  let [cast, setCast] = useState(undefined)

  useMemo(() => {
    cast = shadows.cast

    setCast(cast)
  }, [entity, cast])

  return <Toggle
    showLabel={showLabel}
    scope="Shadows"
    label="cast"
    value={cast}
    update={() => { setCast(!cast); updateTarget(shadows, !cast) }}
  />
}

export default Component
