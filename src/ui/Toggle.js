import React from 'react'

import {
  idFor,
  defaultLabelClasses,
} from './helpers'

const Component = ({
  scope,
  label,
  update,
  value,
  showLabel,
}) => {
  const id = idFor({ scope, label })

  return <div className={showLabel === true ? 'row' : 'col g-0'}>
    <label htmlFor={id} className={defaultLabelClasses(showLabel)}>{label}</label>
    <div className="col g-0 toggle">
      <label htmlFor={id} className="toggle-switch">
        <input
          className="form-check-input"
          type="checkbox"
          id={id}
          checked={value}
          onChange={() => update()}
        />
        <div class="track">
          <div class="knob"></div>
        </div>
      </label>
    </div>
  </div>
}

export default Component
