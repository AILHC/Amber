import React, { useState } from 'react'

import Select from '../ui/Select'

import Creators from './index'

const options = Object.keys(Creators)

const Component = () => {
  const [selected, setSelected] = useState('DirectionalLight')

  const Comp = Creators[selected]

  return <div className="create-entity">
    <div className="type shadow rounded">
      <Select scope="Create" label="Entity" value={selected} options={options} update={setSelected} />
    </div> 
    <Comp />
  </div>
}

export default Component
