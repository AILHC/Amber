import React from 'react'

const Component = ({
  scope,
  label,
  value,
  update,
}) =>
  <div className="inline-normalized-slider col">
    <label
      htmlFor={`${scope}-${label}-id`}
      className="form-label visually-hidden"
    >{label}</label>
    <div>
      <input
        id={`${scope}-${label}-id`}
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
