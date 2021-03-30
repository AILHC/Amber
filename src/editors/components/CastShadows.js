import React, { useState, useMemo } from 'react'

import World, { autoNameIfPlaceholder } from '../../env'

import Toggle from '../../ui/Toggle'

const updateTarget = (component, value) => {
  component.value = value
  component.target.castShadow = value

  component.update()
}

const Component = ({
  type,
  entity,
  showLabel = false,
}) => {
  const { castShadows } = World.getEntity(entity).c

  let [cast, setCast] = useState(undefined)

  useMemo(() => {
    cast = castShadows.value

    setCast(cast)
  }, [entity, cast])

  return <Toggle
    showLabel={showLabel}
    scope="Shadows"
    label="cast"
    value={cast}
    update={() => {
      setCast(!cast)
      updateTarget(castShadows, !cast)
      autoNameIfPlaceholder(type, entity)
    }}
  />
}

export default Component
