import { useRef, useLayoutEffect } from 'react'

import {
  render,
  populate,
  initialize,
} from '../Scene'

import {
  fillParent,
} from './SceneViewStyles'

const Component = ({
  elements
}) => {
  const targetRef = useRef()

  useLayoutEffect(() => {
    if (targetRef.current) {
      const { offsetWidth, offsetHeight } = targetRef.current

      initialize(offsetWidth, offsetHeight)

      populate(elements)

      render()
    }
  })

  return <canvas style={fillParent()} ref={targetRef} id="scene-view" />
}

export default Component