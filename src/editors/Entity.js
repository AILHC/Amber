import React, { useState, useReducer } from 'react'

import World, { EditableEntitiesUpdated } from '../ecs'

import Editors from '../editors/composites'

import Select from '../ui/Select'

const reducer = (_, action) => {
  switch(action.type) {
    case 'EditableAdded': return [...action.payload]
  }
}

const Component = () => {
  const [current, setCurrent] = useState(undefined)
  const [editable, dispatch] = useReducer(reducer, [])

  EditableEntitiesUpdated(entities =>
    dispatch({ type: 'EditableAdded', payload: entities })
  )

  let options = [], Editor

  for (const entity of editable) {
    options.push(entity)

    if (entity === current) {
      const matched = World.getEntity(current)

      Editor = Editors[matched.types.Editor.values().next().value.value]
    }
  }

  if (editable.length > 0 && Editor === undefined) {
    if (current === undefined) setCurrent(editable[0])

    Editor = Editors[World.getEntity(editable[0]).types.Editor.values().next().value.value]
  }

  return options.length > 0 ?
    <div className="edit-entity">
      <div className="type shadow rounded">
        <Select scope="Edit" label="Entity" value={current} options={options} update={setCurrent} />
      </div>
      {Editor ? <Editor entity={current} /> : null}
    </div>
    :
    null
}

export default Component
