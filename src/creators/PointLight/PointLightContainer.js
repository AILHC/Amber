import { compose } from 'redux'
import { connect } from 'react-redux'

import {
} from './PointLightHOFs'

import {
  actions,
  localState
} from './PointLightPropsManager'

import Component from './PointLightComponent'

const Container = compose(
  connect(localState, actions),
)(Component)

export default Container