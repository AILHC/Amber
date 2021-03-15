import { compose } from 'redux'
import { connect } from 'react-redux'

import {
  actions,
  localState
} from './VisibilityPropsManager'

import Component from './VisibilityComponent'

const Container = compose(
  connect(localState, actions),
)(Component)

export default Container