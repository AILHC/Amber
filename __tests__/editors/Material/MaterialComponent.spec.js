import React from 'react'

import { create } from 'react-test-renderer'

import Material from '../../src/editors/Material/MaterialComponent'

describe('The Material component', () => {
  it('renders correctly', () => {
    const root = create(<Material
    />)
  
    expect(root.toJSON()).toMatchSnapshot()
  })
})