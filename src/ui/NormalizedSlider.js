import React from 'react'

const Component = ({
  scope,
  name,
  value,
  update,
}) =>
  <div className="normalized-slider col">
    <label
      htmlFor={`${scope}-id`}
      className="form-label visually-hidden"
    >{name}</label>
    <div>
      <input
        id={`${scope}-id`}
        className="form-control form-control-sm form-range"
        type="range"
        min={0}
        max={1}
        step={0.000001}
        value={value}
        onChange={e => update(e.target.value)}
      />
    </div>
  </div>

export default Component
