import React, { useState, useMemo } from 'react'

import World from '../../env'

import Toggle from '../../ui/Toggle'

const updateTarget = (component, value) => {
  component.target.visible = value

  component.update()
}

const Wireframe = ({ entity, showLabel = false }) => {
  const { wireframe } = World.getEntity(entity).c

  let [visible, setVisible] = useState(undefined)

  useMemo(() => {
    visible = wireframe.target.visible

    setVisible(visible)
  }, [entity, visible])

  return <Toggle
    showLabel={showLabel}
    scope="Wireframe"
    label="visible"
    value={visible}
    update={() => {
      setVisible(!visible)
      updateTarget(wireframe, !visible)
    }}
  />
}

export default Wireframe
