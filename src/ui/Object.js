import React, { useState } from 'react'

import Components from './index'

import { classes } from './helpers'

const generateSummary = (value, converter) => {
  if (converter)
    return converter(value)
  else
    return`${value % 1 > 0 ? '~' : ''}${Math.round(value)}`
}

const Component = ({
  name,
  fields,
  summaryConverter,
  fullLabels = false,
}) => {
  const [expanded, setExpanded] = useState(true)

  return <fieldset className={classes({ name, expanded })}>
    <legend className="container" onClick={() => setExpanded(!expanded)}>
      <div className="row">
        <h3 className="col-auto g-0 disable-select">{name}</h3>
        {!expanded &&
          <p className="col-auto g-0 disable-select">
            {fields.map(f =>
              <span className="property">
                <span className="name">{fullLabels ? f.label : f.label[0]}</span>:
                <span className="value">
                  {generateSummary(f.value, summaryConverter)}
                </span>
              </span>
            )}
          </p>
        }
      </div>
    </legend>
    {expanded && fields.map(f => {
      const Comp = Components[f.type]

      return <Comp key={f.label} {...f} />
    })}
  </fieldset>
}

export default Component
