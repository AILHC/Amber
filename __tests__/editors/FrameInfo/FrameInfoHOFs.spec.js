import {
} from '../../src/editors/FrameInfo/FrameInfoHocs'

describe('The FrameInfo Hocs', () => {
  describe('hocs function', () => {
    it('is a higher order function', () => {
      expect(typeof myHoc()).toEqual('function')
    })
  })
})