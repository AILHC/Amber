import { compose } from 'redux'
import { connect } from 'react-redux'

import {
} from './RotationHOFs'

import {
  actions,
  localState
} from './RotationPropsManager'

import Component from './RotationComponent'

const Container = compose(
  connect(localState, actions),
)(Component)

export default Container