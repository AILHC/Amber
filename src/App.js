import React from 'react'

import './styles/app.css'
import './styles/forms.css'

import PrimaryWindow from './PrimaryWindow'
import PaneSelector  from './PaneSelector'

import './ecs'

const App = () =>
  <div className="container-fluid">
    <div className="row">
      <PrimaryWindow />
      <PaneSelector />
    </div>
  </div>

export default App

