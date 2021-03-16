import React from 'react'

// import {
// } from './SliderStyles'

const Component = ({
  field,
  label,
  value,
  min = 0,
  max = 1,
  step = 0.000001,
  update,
}) =>
  <div className='slider container-fluid'>
    <div className="row">
      <h5 className="col-6">{label}</h5>
      <p className="col-6">{value}</p>
    </div>
    <div className="row">
      <input
        className="col-12"
        type="range"
        id={`${field.toLowerCase().replace(/\s+/g, '_')}-${label.toLowerCase().replace(/\s+/g, '_')}`}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => update(parseFloat(e.target.value))}
      />
    </div>
  </div>

export default Component
