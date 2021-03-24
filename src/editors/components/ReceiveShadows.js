import React, { useState, useMemo } from 'react'

import World from '../../ecs'

import Toggle from '../../ui/Toggle'

const updateTarget = (component, value) => {
  component.receive = value
  component.target.receiveShadow = value

  component.update()
}

const Component = ({ entity, showLabel = true }) => {
  const { shadows } = World.getEntity(entity).c

  let [receive, setReceive] = useState(undefined)

  useMemo(() => {
    receive = shadows.receive

    setReceive(receive)
  }, [entity, receive])

  return <Toggle
    showLabel={showLabel}
    scope="Shadows"
    label="receive"
    value={receive}
    update={() => { setReceive(!receive); updateTarget(shadows, !receive) }}
  />
}

export default Component
