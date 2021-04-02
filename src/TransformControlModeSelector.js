import React, { useReducer } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSyncAlt,
  faArrowsAlt,
  faExpandArrowsAlt,
} from '@fortawesome/pro-duotone-svg-icons'

import { helpers } from './env'

const style = active => ({
  '--fa-primary-color':     'var(--pane-selector-secondary-color)',
  '--fa-secondary-color':   'var(--pane-selector-primary-color)',
  '--fa-primary-opacity':   `var(--pane-selector-primary-${active ? 'active' : 'inactive'}-opacity)`,
  '--fa-secondary-opacity': `var(--pane-selector-secondary-${active ? 'active' : 'inactive'}-opacity)`,
})

const reducer = (_, action) => {
  switch(action.type) {
    case 'SetMode': 
      helpers.transform.mode = action.payload
      return action.payload
  }
}

const Item = ({ icon, active, enabled, clickHandler }) =>
  <li className="list-group-item translate">
    <button
      onClick={clickHandler}
      className="btn btn-primary"
      disabled={active}
    >
      <FontAwesomeIcon icon={icon} size="2x" style={style(enabled && active)} />
    </button>
  </li>

const TransformControlModeSelector = () => {
  const [mode, dispatch] = useReducer(reducer, helpers.transform.mode)
  
  const { enabled } = helpers.transform

  const setMode = mode => dispatch({ type: 'SetMode', payload: mode })

  return <ul id="transform-control-mode" className="list-group list-group-horizontal">
    <Item icon={faArrowsAlt}       active={mode === 'translate'} enabled={enabled} clickHandler={() => setMode('translate')} />
    <Item icon={faSyncAlt}         active={mode === 'rotate'}    enabled={enabled} clickHandler={() => setMode('rotate')}    />
    <Item icon={faExpandArrowsAlt} active={mode === 'scale'}     enabled={enabled} clickHandler={() => setMode('scale')}     />
  </ul>
}

export default TransformControlModeSelector