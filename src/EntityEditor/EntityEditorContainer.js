import { compose } from 'redux'
import { connect } from 'react-redux'

import {
} from './EntityEditorHOFs'

import {
  actions,
  localState
} from './EntityEditorPropsManager'

import Component from './EntityEditorComponent'

const Container = compose(
  connect(localState, actions),
)(Component)

export default Container