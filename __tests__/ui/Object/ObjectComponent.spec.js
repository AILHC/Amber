import React from 'react'

import { create } from 'react-test-renderer'

import Object from '../../src/ui/Object/ObjectComponent'

describe('The Object component', () => {
  it('renders correctly', () => {
    const root = create(<Object
    />)
  
    expect(root.toJSON()).toMatchSnapshot()
  })
})