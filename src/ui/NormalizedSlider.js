import React from 'react'

const Component = ({
  scope,
  label,
  value,
  update,
  displayValue,
}) =>
  <div className="normalized-slider container g-0">
    <div className="row">
      <label
        htmlFor={`${scope}-${label}-id`}
        className="col-form-label col-4 col-form-label-sm"
      >
        <span className="name">{label}</span>
        <span className="value">{displayValue}</span>
      </label>
      <div className="col">
        <input
          id={`${scope}-${label}-id`}
          className="form-control form-control-sm form-range"
          type="range"
          min={0}
          max={100}
          step={.000001}
          value={value}
          onChange={e => update(e.target.value)}
        />
      </div>
    </div>
  </div>

export default Component
