import { compose } from 'redux'
import { connect } from 'react-redux'

import {
} from './HasMeshHOFs'

import {
  actions,
  localState
} from './HasMeshPropsManager'

import Component from './HasMeshComponent'

const Container = compose(
  connect(localState, actions),
)(Component)

export default Container