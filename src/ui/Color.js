import { useState, useEffect } from 'react'

import { RgbColorPicker } from 'react-colorful'

import {
  idFor,
  cssify,
} from './helpers'

const entities = {}

const Component = ({
  scope,
  value,
  label,
  entity,
  update,
}) => {
  let [expanded, setExpanded] = useState(entities[`${entity}-${label}`])

  useEffect(() => {
    setExpanded(entities[`${entity}-${label}`])

    expanded = entities[`${entity}-${label}`]
  }, [entity])

  const updateExpanded = () => {
    setExpanded(!expanded)

    entities[`${entity}-${label}`] = !expanded
  }

  const id = `${label ? idFor({ scope, label }) : cssify(scope)}-color`

  return <fieldset
    className={`color ${expanded ? 'expanded' : 'collapsed'} shadow-sm rounded`}
  >
    <legend className="container" onClick={updateExpanded}>
      <div className="row">
        <h3 className="col-auto g-0 disable-select">{label ? label : 'Color'}</h3>
        {!expanded &&
          <div className="col g-0 swatch disable-select">
            <span className="rounded" style={{ backgroundColor: `rgb(${value.r}, ${value.g}, ${value.b})`}}>&nbsp;</span>
          </div>
        }
      </div>
    </legend>
    {expanded && <RgbColorPicker id={id} color={value} onChange={update} />}
  </fieldset>
}

export default Component
