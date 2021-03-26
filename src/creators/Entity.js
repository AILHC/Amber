import React, { useState } from 'react'

import Select from 'react-select'

import Creators from './index'

const options = Object.keys(Creators).map(c => ({ value: c, label: c }))

const Component = () => {
  const [selected, setSelected] = useState('DirectionalLight')

  const Comp = Creators[selected]

  return <div className="create-entity">
    <div className="type shadow-sm rounded">
      <Select
        defaultValue={options[0]}
        options={options}
        onChange={(sel, meta) => {
          if (meta.action === 'select-option') setSelected(sel.value)
        }}
      />
    </div> 
    <Comp />
  </div>
}

export default Component
