import React from 'react'

const Component = ({
  scope,
  name,
  checked,
  toggle,
}) => {
  const id = `${scope.toLowerCase().replace(/\s+/g, '_')}-${name.toLowerCase().replace(/\s+/g, '_')}`

  return <div className="col-auto g-0">
    <label
      htmlFor={id}
      className="form-label col-auto g-0 col-form-label col-form-label-sm visually-hidden"
    >{name}</label>
    <div className="col-auto g-0 toggle">
      <input
        className="form-check-input"
        type="checkbox"
        id={id}
        checked={checked}
        onChange={() => toggle()}
      />
    </div>
  </div>
}

export default Component
