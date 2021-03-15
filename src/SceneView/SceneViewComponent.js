import { useRef, useLayoutEffect } from 'react'

import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
} from 'three'

import {
  fillParent,
} from './SceneViewStyles'

const Component = ({
  elements
}) => {
  const targetRef = useRef()
  const scene = new Scene()

  useLayoutEffect(() => {
    if (targetRef.current) {
      const { offsetWidth, offsetHeight } = targetRef.current

      const camera = new PerspectiveCamera(75, offsetWidth / offsetHeight, 0.1, 1000)
      const canvas = document.getElementById('scene-view')
      const renderer = new WebGLRenderer({ canvas })

      camera.position.z = 5

      renderer.setSize(offsetWidth, offsetHeight)

      for (const e of elements)
        scene.add(e)

      const renderLoop = function () {
        requestAnimationFrame(renderLoop)

        renderer.render(scene, camera)
      }

      renderLoop()
    }
  })

  return <canvas style={fillParent()} ref={targetRef} id="scene-view" />
}

export default Component