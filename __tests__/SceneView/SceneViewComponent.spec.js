import React from 'react'

import { create } from 'react-test-renderer'

import SceneView from '../src/SceneView/SceneViewComponent'

describe('The SceneView component', () => {
  it('renders correctly', () => {
    const root = create(<SceneView
    />)
  
    expect(root.toJSON()).toMatchSnapshot()
  })
})