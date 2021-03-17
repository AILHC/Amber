import { compose } from 'redux'
import { connect } from 'react-redux'

import {
  actions,
  localState
} from './BoxPropsManager'

import Component from './BoxComponent'

const Container = compose(
  connect(localState, actions),
)(Component)

export default Container