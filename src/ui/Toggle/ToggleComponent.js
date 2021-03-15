import React from 'react'

// import {
// } from './ToggleStyles'

const Component = ({
  field,
  label,
  checked,
  toggle,
}) =>
  <div className='toggle container-fluid'>
    <div className="row">
      <h5 className="col-10">{label}</h5>
      <input
        className="col-2"
        type="checkbox"
        id={`${field.toLowerCase().replace(/\s+/g, '_')}-${label.toLowerCase().replace(/\s+/g, '_')}`}
        checked={checked}
        onChange={() => toggle()}
      />
    </div>
  </div>

export default Component
