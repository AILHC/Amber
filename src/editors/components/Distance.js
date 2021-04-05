import React, { useState, useMemo } from 'react'

import World, { autoNameIfPlaceholder } from '../../env'

import InlineNormalizedSlider from '../../ui/InlineNormalizedSlider'

import Wrapper from '../../helpers/FieldsetWrapper'

const updateTarget = (component, value) => {
  component.value = value
  component.target.distance = value * 500

  component.update()
}

const Distance = ({
  type,
  entity,
}) => {
  const clazz = entity.toLowerCase().replace(/\s+/g, '_')

  const { distance } = World.getEntity(entity).c

  let [strength, setStrength] = useState(undefined)

  useMemo(() => {
    strength = distance.value

    setStrength(strength)
  }, [entity, strength])

  return <Wrapper
    label="Distance"
    child={<InlineNormalizedSlider
      scope={clazz}
      label="distance"
      value={strength}
      update={val => {
        setStrength(val)
        updateTarget(distance, val)
        autoNameIfPlaceholder(type, entity)
      }}
    />}
  />
}

export default Distance
