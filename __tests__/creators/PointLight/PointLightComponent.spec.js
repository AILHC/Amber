import React from 'react'

import { create } from 'react-test-renderer'

import PointLight from '../../src/creators/PointLight/PointLightComponent'

describe('The PointLight component', () => {
  it('renders correctly', () => {
    const root = create(<PointLight
    />)
  
    expect(root.toJSON()).toMatchSnapshot()
  })
})