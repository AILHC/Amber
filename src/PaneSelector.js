import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCog,
  faBooks,
  faPlusSquare,
} from '@fortawesome/pro-duotone-svg-icons'

import EntityCreator from './creators/Entity'
import EntityEditor  from './editors/Entity'

const Item = ({ children }) =>
  <li className="flex-sm-fill text-sm-center nav-item" role="presentation">
    {children}
  </li>

const style = active => ({
  '--fa-primary-color': '#372214',
  '--fa-secondary-color': '#b8733a',
  '--fa-primary-opacity': active ? 1 : .5,
  '--fa-secondary-opacity': active ? 1 : .5
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
    className={`tab-pane fade${active ? ' show active' : ''}`}
  >
    {children}
  </div>

const Component = () => {
  const [mode, setMode] = useState('creator')

  return <div className="right pane col-2">
    <ul className="nav flex-column flex-sm-row nav-pills" role="tablist">
      <Item>
        <Button
          pane="creator"
          icon={faPlusSquare}
          active={mode === 'creator'}
          handleClick={() => setMode('creator')}
        />
      </Item>
      <Item>
        <Button
          pane="editor"
          icon={faBooks}
          active={mode === 'editor'}
          handleClick={() => setMode('editor')}
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
    <div className="tab-content" id="pills-tabContent">
      <Tab pane="creator" active={mode === 'creator'}>
        <EntityCreator />
      </Tab>
      <Tab pane="editor" active={mode === 'editor'}>
        <EntityEditor />
      </Tab>
      <Tab pane="settings" active={mode === 'settings'}>
        <h3>Settings</h3>
        <p>Hello world!</p>
      </Tab>
    </div>
  </div>
}

export default Component