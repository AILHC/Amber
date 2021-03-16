import { compose } from 'redux'
import { connect } from 'react-redux'

import {
  actions,
  localState
} from './DirectionalLightPropsManager'

import Component from './DirectionalLightComponent'

const Container = compose(
  connect(localState, actions),
)(Component)

export default Container