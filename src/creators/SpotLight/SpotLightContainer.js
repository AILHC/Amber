import { compose } from 'redux'
import { connect } from 'react-redux'

import {
} from './SpotLightHOFs'

import {
  actions,
  localState
} from './SpotLightPropsManager'

import Component from './SpotLightComponent'

const Container = compose(
  connect(localState, actions),
)(Component)

export default Container