import { compose } from 'redux'
import { connect } from 'react-redux'

import {
} from './NewEntityHOFs'

import {
  actions,
  localState
} from './NewEntityPropsManager'

import Component from './NewEntityComponent'

const Container = compose(
  connect(localState, actions),
)(Component)

export default Container