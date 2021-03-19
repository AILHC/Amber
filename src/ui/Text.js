import React from 'react'

const Component = ({
  scope,
  name,
  value,
  update,
}) =>
  <div className="col-auto g-0">
    <label
      htmlFor={`${scope}-id`}
      className="form-label col-auto g-0 col-form-label col-form-label-sm visually-hidden"
    >{name}</label>
    <div className="col-auto g-0">
      <input
        id={`${scope}-id`}
        className="form-control form-control-sm"
        type="text"
        value={value}
        placeholder="Give this entity a name"
        onChange={e => update(e.target.value)}
      />
    </div>
  </div>

export default Component
