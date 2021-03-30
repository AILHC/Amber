import React, { useState, useReducer, useEffect } from 'react'

import Select from 'react-select'

import World, {
  EntityAdded,
  RemoveEntity,
  EntityRenamed,
  EntityRemoved,
  EditorPlacehodlerId,
} from './env'

import Creators, { options } from './creators'
import Editors from './editors/composites'

import Welcome from './Welcome'

const styles = {
  menu: provided => ({
    ...provided,
    zIndex: 5,
  })
}

const reducer = (state, action) => {
  const {
    EcsId,
    EditorId,
  } = action.payload

  switch(action.type) {
    case 'EntityAdded': return [
      ...state,
      { ecs: EcsId, editor: `Editor:${EditorPlacehodlerId}` }
    ]
    case 'EntityRenamed': return [
      ...state.filter(s => s.ecs !== EcsId),
      { ecs: EcsId, editor: `Editor:${EditorId.current}` }
    ]
    case 'EntityRemoved': return [...state.filter(s => s.ecs !== EcsId)]
  }
}

const Component = () => {
  const [editable, dispatch   ] = useReducer(reducer, [])
  const [selected, setSelected] = useState(undefined)

  const create = tokens => {
    if (tokens[0] === 'Creator') {
      Creators[tokens[1]]()
  
      setSelected(`Editor:${EditorPlacehodlerId}`)
    }
  }

  let allOptions = [...options]

  useEffect(() => {
    EntityAdded(({ EcsId, EditorId }) =>
      dispatch({
        type: 'EntityAdded',
        payload: { EcsId, EditorId }
      })
    )
  
    EntityRenamed(({ EcsId, EditorId }) => {
      dispatch({
        type: 'EntityRenamed',
        payload: { EcsId, EditorId },
      })
  
      setSelected(`Editor:${EditorId.current}`)
    })
  
    EntityRemoved(({ EcsId, EditorId }) =>
      dispatch({
        type: 'EntityRemoved',
        payload: { EcsId, EditorId },
      })
    )
  })

  let entity, Comp = Welcome, entities = {
    label: 'Entities',
    options: []
  }

  for (const e of editable) {
    const tokens = e.editor.split(':')

    if (tokens[1] !== EditorPlacehodlerId)
      entities.options.push({
        label: tokens[1],
        value: e.editor,
      })
  }
  
  if (entities.options.length > 0)
    allOptions.push(entities)

  let t, current
  
  if (selected) {
    t       = selected.split(':')
    current = t[1]
    
    if (t[0] === 'Editor') {
      for (const e of editable) {
        const tokens = e.editor.split(':')
  
        if (tokens[1] === current) {
          const matched = World.getEntity(e.ecs)
    
          Comp   = Editors[matched.types.Editor.values().next().value.value]
          entity = e.ecs
        }
      }
    }
    else if (t[0] === 'Creator')
      Comp = Creators[t[1]]
  }

  return <div className="library">
    <div className="type shadow-sm rounded">
      <Select
        styles={styles}
        name="library"
        isClearable
        isSearchable
        options={allOptions}
        onChange={(sel, meta) => {
          if (meta.action === 'select-option') {
            const tokens = sel.value.split(':')

            if (selected === undefined) {
              if (tokens[0] === 'Editor')
                setSelected(sel.value)
              else
                create(tokens)
            } else {
              if (tokens[0] === 'Editor')
                setSelected(sel.value)
              else {
                RemoveEntity({ EditorId: EditorPlacehodlerId })

                create(tokens)
              }
            }
          }
          else if (meta.action === 'clear') {
            RemoveEntity({ EditorId: EditorPlacehodlerId })

            setSelected(undefined)
          }
        }}
      />
    </div> 
    {Comp && <Comp entity={entity} />}
  </div>
}

export default Component
