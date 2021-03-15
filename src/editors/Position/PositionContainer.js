import { compose } from 'redux'
import { connect } from 'react-redux'

import {
} from './PositionHOFs'

import {
  actions,
  localState
} from './PositionPropsManager'

import Component from './PositionComponent'

const Container = compose(
  connect(localState, actions),
)(Component)

export default Container