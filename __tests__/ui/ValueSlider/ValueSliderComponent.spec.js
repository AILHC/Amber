import React from 'react'

import { create } from 'react-test-renderer'

import ValueSlider from '../../src/ui/ValueSlider/ValueSliderComponent'

describe('The ValueSlider component', () => {
  it('renders correctly', () => {
    const root = create(<ValueSlider
    />)
  
    expect(root.toJSON()).toMatchSnapshot()
  })
})