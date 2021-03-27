import React, { useState, useReducer } from 'react'

import Select from 'react-select'

import World, { EditableEntitiesUpdated } from './ecs'

import Creators, { options } from './creators'
import Editors from './editors/composites'

import Welcome from './Welcome'

const reducer = (state, action) => {
  switch(action.type) {
    case 'EditableAdded': return [...state, `Editor:${action.payload}`]
  }
}

const Component = () => {
  const [editable, dispatch   ] = useReducer(reducer, [])
  const [selected, setSelected] = useState(undefined)

  let allOptions = [...options]

  EditableEntitiesUpdated(entity =>
    dispatch({ type: 'EditableAdded', payload: entity })
  )

  let entity, Comp = Welcome, entities = {
    label: 'Entities',
    options: []
  }

  for (const e of editable) {
    const tokens = e.split(':')

    entities.options.push({
      label: tokens[1],
      value: e
    })
  }
  
  allOptions.push(entities)

  let t, current
  
  if (selected) {
    t       = selected.split(':')
    current = t[1]
    
    if (t[0] === 'Editor') {
      for (const e of editable) {
        const tokens = e.split(':')
  
        if (tokens[1] === current) {
          const matched = World.getEntity(current)
    
          Comp   = Editors[matched.types.Editor.values().next().value.value]
          entity = tokens[1]
        }
      }
    }
    else if (t[0] === 'Creator')
      Comp = Creators[t[1]]
  }

  return <div className="library">
    <div className="type shadow-sm rounded">
      <Select
        name="library"
        isClearable
        isSearchable
        options={allOptions}
        onChange={(sel, meta) => {
          if (meta.action === 'select-option')
            setSelected(sel.value)
          else if (meta.action === 'clear')
            setSelected(undefined)
        }}
      />
    </div> 
    {Comp && <Comp entity={entity} />}
  </div>
}

export default Component
