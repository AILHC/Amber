import React from 'react'

import Editors from '../Editors'

import {
} from './EntityEditorStyles'

const Component = ({
  options,
  currentEntity,
  setCurrentEntity,
  currentComponents,
}) =>
  <div>
    <select onChange={e => setCurrentEntity(e.target.value)} value={currentEntity.id}>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
    {currentComponents.map((c, index) => {
      const Comp = Editors[c.name]

      console.log(c.name, Comp)

      return Comp ? <Comp key={`${c.name}:${index}`} entity={currentEntity.id} /> : null
      
    })}
  </div>

export default Component
