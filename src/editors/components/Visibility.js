import React, { useState, useMemo } from 'react'

import World from '../../ecs'

import Toggle from '../../ui/Toggle'

const updateTarget = (component, value) => {
  component.value = value
  component.target.visible = value

  component.update()
}

const Component = ({ entity }) => {
  const { visibility } = World.getEntity(entity).c

  let [visible, setVisible] = useState(undefined)

  useMemo(() => {
    visible = visibility.value

    setVisible(visible)
  }, [entity, visible])

  return <Toggle
    scope="Visibility"
    name="value"
    checked={visible}
    toggle={() => { setVisible(!visible); updateTarget(visibility, !visible) }}
  />
}

export default Component
