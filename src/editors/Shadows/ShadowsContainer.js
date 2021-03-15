import { compose } from 'redux'
import { connect } from 'react-redux'

import {
} from './ShadowsHOFs'

import {
  actions,
  localState
} from './ShadowsPropsManager'

import Component from './ShadowsComponent'

const Container = compose(
  connect(localState, actions),
)(Component)

export default Container