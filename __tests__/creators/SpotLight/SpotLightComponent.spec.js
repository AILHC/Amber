import React from 'react'

import { create } from 'react-test-renderer'

import SpotLight from '../../src/creators/SpotLight/SpotLightComponent'

describe('The SpotLight component', () => {
  it('renders correctly', () => {
    const root = create(<SpotLight
    />)
  
    expect(root.toJSON()).toMatchSnapshot()
  })
})