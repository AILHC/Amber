import React from 'react'

import Select from '../ui/Select'

import Creators from '../Creators'

const Component = ({
  options,
  selected,
  setSelected,
}) => {
  const Comp = Creators[selected]

  return <div className="create-entity">
    <div className="type shadow rounded">
      <Select scope="Create" name="Entity" value={selected} options={options} update={setSelected} />
    </div> 
    <Comp />
  </div>
}

export default Component
