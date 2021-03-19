import React, { useState } from 'react'

import { RgbColorPicker } from 'react-colorful'

const Component = ({
  scope,
  value,
  update,
}) => {
  const [expanded, setExpanded] = useState(true)

  return <fieldset
    className={`color ${expanded ? 'expanded' : 'collapsed'} shadow-sm rounded`}
  >
    <legend className="container" onClick={() => setExpanded(!expanded)}>
      <div className="row">
        <h3 className="col-auto g-0 disable-select">Color</h3>
        {!expanded &&
          <div className="col g-0 swatch disable-select">
            <span className="rounded" style={{ backgroundColor: `rgb(${value.r}, ${value.g}, ${value.b})`}}>&nbsp;</span>
          </div>
        }
      </div>
    </legend>
    {expanded && <RgbColorPicker id={`${scope}-color`} color={value} onChange={update} />}
  </fieldset>
}

export default Component
