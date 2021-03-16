import React from 'react'

import { create } from 'react-test-renderer'

import DirectionalLight from '../../src/creators/DirectionalLight/DirectionalLightComponent'

describe('The DirectionalLight component', () => {
  it('renders correctly', () => {
    const root = create(<DirectionalLight
    />)
  
    expect(root.toJSON()).toMatchSnapshot()
  })
})