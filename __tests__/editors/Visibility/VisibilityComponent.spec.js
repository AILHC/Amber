import React from 'react'

import { create } from 'react-test-renderer'

import Visibility from '../../src/editors/Visibility/VisibilityComponent'

describe('The Visibility component', () => {
  it('renders correctly', () => {
    const root = create(<Visibility
    />)
  
    expect(root.toJSON()).toMatchSnapshot()
  })
})