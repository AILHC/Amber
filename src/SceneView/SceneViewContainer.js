import { compose } from 'redux'
import { connect } from 'react-redux'

import {
} from './SceneViewHOFs'

import {
  actions,
  localState
} from './SceneViewPropsManager'

import Component from './SceneViewComponent'

const Container = compose(
  connect(localState, actions),
)(Component)

export default Container