import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCog,
  faBooks,
} from '@fortawesome/pro-duotone-svg-icons'

import Library from './Library'

const Item = ({ children }) =>
  <li className="nav-item" role="presentation">
    {children}
  </li>

const style = active => ({
  '--fa-primary-color':     'var(--pane-selector-primary-color)',
  '--fa-secondary-color':   'var(--pane-selector-secondary-color)',
  '--fa-primary-opacity':   `var(--pane-selector-primary-${active ? 'active' : 'inactive'}-opacity)`,
  '--fa-secondary-opacity': `var(--pane-selector-secondary-${active ? 'active' : 'inactive'}-opacity)`,
})

const Button = ({ pane, icon, active, handleClick }) => {
  return <button
    role="tab"
    type="button"
    data-bs-toggle="pill"
    id={`nav-${pane}-tab`}
    onClick={handleClick}
    aria-controls={`${pane}-pane`}
    data-bs-target={`#${pane}-pane`}
    aria-selected={active ? 'true': 'false'}
    className={`nav-link${active ? ' active' : ''}`}
  >
    <FontAwesomeIcon icon={icon} size="3x" style={style(active)} />
  </button>
}

const Tab = ({ pane, active, children }) =>
  <div
    role="tabpanel"
    id={`${pane}-pane`}
    aria-labelledby={`nav-${pane}-tab`}
    className={`tab-pane${active ? ' show active' : ''}`}
  >
    {children}
  </div>

const Component = () => {
  const [mode, setMode] = useState('library')

  return <div className="right pane col-2 g-0">
    <ul className="nav flex-sm-row justify-content-center nav-pills" role="tablist">
      <Item>
        <Button
          pane="library"
          icon={faBooks}
          active={mode === 'library'}
          handleClick={() => setMode('library')}
        />
      </Item>
      <Item>
        <Button
          pane="settings"
          icon={faCog}
          active={mode === 'settings'}
          handleClick={() => setMode('settings')}
        />
      </Item>
    </ul>
    <div className="tab-content" id="nav-tab-content">
      <Tab pane="library" active={mode === 'library'}>
        <Library />
      </Tab>
      <Tab pane="settings" active={mode === 'settings'}>
        <h3>Settings</h3>
        <p>Hello world!</p>
      </Tab>
    </div>
  </div>
}

export default Component