import React from 'react'

import { defaultLabelClasses } from './helpers'

const Component = ({
  scope,
  label,
  value,
  update,
  showLabel,
}) =>
  <div className="col g-0">
    <label htmlFor={`${scope}-id`} className={defaultLabelClasses(showLabel)}>{label}</label>
    <div className="col-auto g-0">
      <input
        id={`${scope}-id`}
        className="form-control form-control-sm"
        type="text"
        value={value}
        placeholder="Something descriptive"
        onChange={e => update(e.target.value)}
      />
    </div>
  </div>

export default Component
