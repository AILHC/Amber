import React from 'react'

import './styles/app.css'
import './styles/forms.css'

import PaneSelector                 from './PaneSelector'
import TransformControlModeSelector from './TransformControlModeSelector'

import './env'

const App = () =>
  <div id="amber">
    <PaneSelector />
    <TransformControlModeSelector />
  </div>

export default App

