import {
} from '../../src/editors/Position/PositionHocs'

describe('The Position Hocs', () => {
  describe('hocs function', () => {
    it('is a higher order function', () => {
      expect(typeof myHoc()).toEqual('function')
    })
  })
})