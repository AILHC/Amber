import React from 'react'

import Creators from '../Creators'

// import {
// } from './NewEntityStyles'

const Component = ({
  options,
  selected,
  setSelected,
}) => {
  const Comp = Creators[selected || 'DirectionalLight']

  return <div>
    <select value={selected} onChange={e => setSelected(e.target.value)}>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
    <Comp />
  </div>
}

export default Component
