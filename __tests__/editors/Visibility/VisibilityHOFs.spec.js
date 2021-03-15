import {
} from '../../src/editors/Visibility/VisibilityHocs'

describe('The Visibility Hocs', () => {
  describe('hocs function', () => {
    it('is a higher order function', () => {
      expect(typeof myHoc()).toEqual('function')
    })
  })
})