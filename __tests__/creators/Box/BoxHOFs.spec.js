import {
} from '../../src/creators/Box/BoxHocs'

describe('The Box Hocs', () => {
  describe('hocs function', () => {
    it('is a higher order function', () => {
      expect(typeof myHoc()).toEqual('function')
    })
  })
})