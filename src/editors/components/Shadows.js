import React, { useState } from 'react'

import World from '../../env'

import { classes } from '../../ui/helpers'

import CastShadows    from './CastShadows'
import ReceiveShadows from './ReceiveShadows'

const fields = [
  CastShadows,
  ReceiveShadows,
]

const Shadows = ({ entity }) => {
  const {
    castShadows,
    receiveShadows,
  } = World.getEntity(entity).c

  const [expanded, setExpanded] = useState(true)

  return <fieldset className={classes({ label: 'Shadows', expanded })}>
    <legend className="container" onClick={() => setExpanded(!expanded)}>
      <div className="row">
        <h3 className="col-auto g-0 disable-select">Shadows</h3>
        {!expanded &&
          <p className="col-auto g-0 disable-select">
            <span className="property">
              <span className="name">cast</span>:
              <span className="value">
                {castShadows.value ? 'yes' : 'no'}
              </span>
            </span>
            <span className="property">
              <span className="name">receive</span>:
              <span className="value">
                {receiveShadows.value ? 'yes' : 'no'}
              </span>
            </span>
          </p>
        }
      </div>
    </legend>
    {expanded && fields.map((F, index) => <F key={`${index}`} entity={entity} showLabel />)}
  </fieldset>
}

export default Shadows