import { compose } from 'redux'
import { connect } from 'react-redux'

import {
} from './MaterialHOFs'

import {
  actions,
  localState
} from './MaterialPropsManager'

import Component from './MaterialComponent'

const Container = compose(
  connect(localState, actions),
)(Component)

export default Container