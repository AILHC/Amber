import { useState, useEffect } from 'react'

import Components from './index'

import { classes } from './helpers'

const entities = {}

const generateSummary = (value, converter) => {
  if (converter)
    return converter(value)
  else
    return`${value % 1 > 0 ? '~' : ''}${Math.round(value)}`
}

const Component = ({
  label,
  entity,
  fields,
  summaryConverter,
  fullLabels = false,
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

  return <fieldset className={classes({ label, expanded })}>
    <legend className="container" onClick={updateExpanded}>
      <div className="row">
        <h3 className="col-auto g-0 disable-select">{label}</h3>
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
