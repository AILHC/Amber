import React, { useState, useMemo } from 'react'

import World from '../../ecs'

import Toggle from '../../ui/Toggle'

const updateTarget = (component, value) => {
  component.value = value
  component.target.receiveShadow = value

  component.update()
}

const Component = ({ entity }) => {
  const { receiveShadows } = World.getEntity(entity).c

  let [receive, setReceive] = useState(undefined)

  useMemo(() => {
    receive = receiveShadows.value

    setReceive(receive)
  }, [entity, receive])

  return <Toggle
    scope="Receive Shadows"
    name="value"
    checked={receive} toggle={() => { setReceive(!receive); updateTarget(receiveShadows, !receive) }}
  />
}

export default Component
