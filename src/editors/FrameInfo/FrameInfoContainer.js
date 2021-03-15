import { compose } from 'redux'
import { connect } from 'react-redux'

import {
} from './FrameInfoHOFs'

import {
  actions,
  localState
} from './FrameInfoPropsManager'

import Component from './FrameInfoComponent'

const Container = compose(
  connect(localState, actions),
)(Component)

export default Container