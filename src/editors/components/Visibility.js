import React, { useState, useMemo } from 'react'

import World from '../../env'

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
    label="value"
    value={visible}
    update={() => {
      setVisible(!visible)
      updateTarget(visibility, !visible)
    }}
  />
}

export default Component
