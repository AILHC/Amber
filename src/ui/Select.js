import React from 'react'

const Component = ({
  scope,
  name,
  value,
  update,
  options,
}) =>
  <div className="col-auto g-0">
    <label
      htmlFor={`${scope}-${name}`}
      className="form-label col-auto g-0 col-form-label col-form-label-sm visually-hidden"
    >{name}</label>
    <div className="col-auto g-0">
      <select
        id={`${scope}-${name}`}
        className="form-select form-select-sm"
        value={value}
        onChange={e => update(e.target.value)}
      >
        {options.map(m => <option key={m} value={m}>{m}</option>)}
      </select>
    </div>
  </div>


export default Component
