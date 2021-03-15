import React from 'react'

import { create } from 'react-test-renderer'

import Rotation from '../../src/editors/Rotation/RotationComponent'

describe('The Rotation component', () => {
  it('renders correctly', () => {
    const root = create(<Rotation
    />)
  
    expect(root.toJSON()).toMatchSnapshot()
  })
})