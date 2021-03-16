import React, { useState } from 'react'

import World from '../../ecs/Ape'

import Toggle from '../../ui/Toggle/ToggleComponent'

const Component = ({ entity }) => {
  const { receiveShadows } = World.getEntity(entity).c

  const [receive, setReceive] = useState(receiveShadows.value)

  return <div className="shadows editor">
    <Toggle field="Receive Shadows" label="Receive Shadows" checked={receive} toggle={() => { setReceive(!receive); receiveShadows.update({ value: !receive }) }} />
  </div>
}

export default Component
