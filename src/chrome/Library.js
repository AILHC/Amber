import React, { useState, useReducer, useEffect } from 'react'

import Select from 'react-select'

import World, {
  scene,
  helpers,
  EntityAdded,
  RemoveEntity,
  EntityRenamed,
  EntityRemoved,
  EntitiesByEditorId,
  EditorPlacehodlerId,
  SceneElementsByEditorId,
} from '../env'

import Creators, { options } from '../creators'
import Editors from '../editors/composites'

import Welcome from './Welcome'

const styles = {
  control: provided => ({
    ...provided,
    backgroundColor: 'var(--library-background-color)',
    border: 'none',
    boxShadow: 'none',
    ':hover': {
      borderColor: 'transparent',
      boxShadow: 'none',
    }
  }),
  singleValue: provided => ({
    ...provided,
    color: 'var(--library-text-color)',
  }),
  menu: provided => ({
    ...provided,
    backgroundColor: 'var(--library-background-color)',
    border: 'none',
    color: 'var(--library-text-color)',
    zIndex: 100,
    boxShadow: 'none',
  }),
  groupHeading: provided => ({
    ...provided,
    fontWeight: 900,
    paddingLeft: '.75rem',
    color: 'var(--library-group-heading-text-color)',
  }),
  option: (provided, state) => ({
    ...provided,
    color: `var(--library-text-color${state.isSelected ? '-inverted' : ''})`,
    backgroundColor: state.isSelected ? 'var(--library-option-hover-background-color)' : 'transparent',
    ':hover': {
      ...provided,
      backgroundColor: 'var(--library-option-hover-background-color)',
      color: 'var(--library-text-color-inverted)',
    }
  }),
  input: provided => ({
    ...provided,
    color: 'var(--library-text-color)',
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

let registeredForEntityActivity = false

let registeredForEntityRename = {}

const Library = () => {
  const [editable, dispatch   ] = useReducer(reducer, [])
  const [selected, setSelected] = useState(undefined)

  const create = tokens => {
    if (tokens[0] === 'Creator') {
      Creators[tokens[1]]()
  
      setSelected({ label: tokens[1], value: `Editor:${EditorPlacehodlerId}` })
    }
  }

  let allOptions = [...options]

  useEffect(() => {
    if (registeredForEntityActivity === false) {
      EntityAdded(({ EcsId, EditorId }) =>
        dispatch({
          type: 'EntityAdded',
          payload: { EcsId, EditorId }
        })
      )
  
      EntityRemoved(({ EcsId, EditorId }) =>
        dispatch({
          type: 'EntityRemoved',
          payload: { EcsId, EditorId },
        })
      )

      registeredForEntityActivity = true
    }
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
    t       = selected.value.split(':')
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
    <div className="type rounded">
      <Select
        value={selected}
        styles={styles}
        name="library"
        isClearable
        isSearchable
        options={allOptions}
        onChange={(sel, meta) => {
          helpers.transform.enabled = false
          helpers.transform.detach()

          if (meta.action === 'select-option') {
            const tokens = sel.value.split(':')

            let uuid

            if (tokens[0] === 'Editor') {
              setSelected(sel)

              uuid = SceneElementsByEditorId[tokens[1]]
            } else {
              if (selected !== undefined)
                RemoveEntity({ EditorId: EditorPlacehodlerId })

              create(tokens)

              const ecsId = EntitiesByEditorId[EditorPlacehodlerId]

              if (!registeredForEntityRename[ecsId]) {
                EntityRenamed(ecsId, ({ EcsId, EditorId }) => {
                  dispatch({
                    type: 'EntityRenamed',
                    payload: { EcsId, EditorId },
                  })
              
                  setSelected({ label: EditorId.current, value: `Editor:${EditorId.current}` })
                })

                registeredForEntityRename[ecsId] = true
              }

              uuid = SceneElementsByEditorId[EditorPlacehodlerId]
            }

            const obj = scene.getObjectByProperty('uuid', uuid)

            helpers.transform.enabled = true
            helpers.transform.attach(obj)
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

export default Library
