import React from 'react'

import World from '../ecs'

import Editors from '../Editors'

const Component = ({
  currentEntity,
  setCurrentEntity,
  editableEntities,
}) => {
  let options = [], components = []

  for (const editable of editableEntities) {
    options.push(editable)

    if (editable === currentEntity) {
      const matched = World.entities.get(editable),
            keys    = Object.keys(matched.types)

      components = keys.map(k => ({ name: k, ...matched.types[k].values().next().value }))
    }
  }

  return <div>
    <select onChange={e => setCurrentEntity(e.target.value)} value={currentEntity}>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
    {components.map((c, index) => {
      const Comp = Editors[c.name]

      return Comp ? <Comp key={`${c.name}:${index}`} entity={currentEntity} /> : null
    })}
  </div>
}

export default Component
