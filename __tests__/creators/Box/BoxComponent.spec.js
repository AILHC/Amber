import React from 'react'

import { create } from 'react-test-renderer'

import Box from '../../src/creators/Box/BoxComponent'

describe('The Box component', () => {
  it('renders correctly', () => {
    const root = create(<Box
    />)
  
    expect(root.toJSON()).toMatchSnapshot()
  })
})