import React from 'react'

import { create } from 'react-test-renderer'

import Toggle from '../../src/ui/Toggle/ToggleComponent'

describe('The Toggle component', () => {
  it('renders correctly', () => {
    const root = create(<Toggle
    />)
  
    expect(root.toJSON()).toMatchSnapshot()
  })
})