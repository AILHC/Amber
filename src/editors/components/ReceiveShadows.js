import React, { useState, useMemo } from 'react'

import World, { autoNameIfPlaceholder } from '../../env'

import Toggle from '../../ui/Toggle'

const updateTarget = (component, value) => {
  component.value = value
  component.target.receiveShadow = value

  component.update()
}

const Component = ({
  type,
  entity,
  showLabel = false,
}) => {
  const { receiveShadows } = World.getEntity(entity).c

  let [receive, setReceive] = useState(undefined)

  useMemo(() => {
    receive = receiveShadows.value

    setReceive(receive)
  }, [entity, receive])

  return <Toggle
    showLabel={showLabel}
    scope="Shadows"
    label="receive"
    value={receive}
    update={() => {
      setReceive(!receive)
      updateTarget(receiveShadows, !receive)
      autoNameIfPlaceholder(type, entity)
    }}
  />
}

export default Component
