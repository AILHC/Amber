import React from 'react'

import { create } from 'react-test-renderer'

import Shadows from '../../src/editors/Shadows/ShadowsComponent'

describe('The Shadows component', () => {
  it('renders correctly', () => {
    const root = create(<Shadows
    />)
  
    expect(root.toJSON()).toMatchSnapshot()
  })
})