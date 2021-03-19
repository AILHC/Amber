import { compose } from 'redux'
import { connect } from 'react-redux'

import {
} from './PlaneHOFs'

import {
  actions,
  localState
} from './PlanePropsManager'

import Component from './PlaneComponent'

const Container = compose(
  connect(localState, actions),
)(Component)

export default Container