import React, { useState, useMemo } from 'react'

const Component = ({
  scope,
  label,
  value,
  entity,
  min = 0,
  max = 1,
  step = 0.000001,
  update,
}) => {
  const _scope = scope.toLowerCase().replace(/\s+/g, '_')
  const _label = label.toLowerCase().replace(/\s+/g, '_')

  const id = `${_scope}-${_label}`

  let [_min, _setMin] = useState()
  let [_max, _setMax] = useState()

  useMemo(() => {
    _min = min
    _max = max

    _setMin(_min)
    _setMax(_max)
  }, [entity, min, max])

  return <fieldset className="slider">
    <legend className="visually-hidden">Fields to edit the {scope} {label} value</legend>
    <div className="row">
      <div className="label-and-value col-4">
        <label
          htmlFor={`${id}-value`}
          className="col-form-label col-form-label-sm"
        >{label}</label>
        <div>
          <input
            className="form-control form-control-sm"
            type="number"
            id={`${id}-value`}
            value={value}
            onChange={e => update(parseFloat(e.target.value))}
          />
        </div>
      </div>
      <div className="value-range col-8">
        <div className="row">
          <div className="col-12 g-0">
            <label className="visually-hidden" htmlFor={id}>Value range</label>
            <input
              className="form-control form-control-sm form-range"
              type="range"
              id={id}
              min={_min}
              max={_max}
              step={step}
              value={value}
              onChange={e => update(parseFloat(e.target.value))}
            />
          </div>
        </div>
        <div className="row min-max">
          <div className="col-4 g-0">
            <label className="visually-hidden" htmlFor={`${id}-min`}>Minimum allowed value</label>
            <input
              className="form-control form-control-sm min"
              type="number"
              id={`${id}-min`}
              value={_min}
              onChange={e => _setMin(parseInt(e.target.value))}
            />
          </div>
          <div className="col-4 g-0">
            <label className="visually-hidden" htmlFor={`${id}-max`}>Maximum allowed value</label>
            <input
              className="form-control form-control-sm max"
              type="number"
              id={`${id}-max`}
              value={_max}
              onChange={e => _setMax(parseInt(e.target.value))}
            />
          </div>
        </div>
      </div>
    </div>
  </fieldset>
}

export default Component
