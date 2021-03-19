import React, { useState } from 'react'

import Slider from './Slider'
import Toggle from './Toggle'

const components = {
  Slider,
  Toggle,
}

const Component = ({
  name,
  fields,
}) => {
  const [expanded, setExpanded] = useState(true)
  const clazz = name.toLowerCase().replace(/\s+/g, '_')

  return <fieldset
    className={`${clazz} ${expanded ? 'expanded' : 'collapsed'} shadow-sm rounded`}>
    <legend className="container" onClick={() => setExpanded(!expanded)}>
      <div className="row">
        <h3 className="col-auto g-0 disable-select">{name}</h3>
        {!expanded &&
          <p className="col-auto g-0 disable-select">
            {fields.map(f => {
              const remainder = f.value % 1
              return <span className="property">
                <span className="name">{f.label}</span>:
                <span className="value">
                  {remainder > 0 ? '~' : ''}
                  {Math.round(f.value)}
                </span>
              </span>
            })}
          </p>
        }
      </div>
    </legend>
    {expanded && fields.map(f => {
      const Comp = components[f.type]

      console.log(f)

      return <Comp key={f.label} {...f} />
    })}
  </fieldset>
}

export default Component
