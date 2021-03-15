import React from 'react'

import { create } from 'react-test-renderer'

import Position from '../../src/editors/Position/PositionComponent'

describe('The Position component', () => {
  it('renders correctly', () => {
    const root = create(<Position
    />)
  
    expect(root.toJSON()).toMatchSnapshot()
  })
})