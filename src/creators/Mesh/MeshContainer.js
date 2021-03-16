import { compose } from 'redux'
import { connect } from 'react-redux'

import {
} from './MeshHOFs'

import {
  actions,
  localState
} from './MeshPropsManager'

import Component from './MeshComponent'

const Container = compose(
  connect(localState, actions),
)(Component)

export default Container