import React from 'react'

import {
} from './FrameInfoStyles'

const Component = ({
  time,
  deltaTime,
  deltaFrame,
}) =>
  <dl>
    <dt>Time since start</dt>
    <dd>{time}</dd>
    <dt>Delta Time</dt>
    <dd>{deltaTime}</dd>
    <dt>Delta Frame</dt>
    <dd>{deltaFrame}</dd>
  </dl>

Component.displayName = 'FrameInfo'

export default Component
