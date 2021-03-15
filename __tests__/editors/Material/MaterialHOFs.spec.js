import {
} from '../../src/editors/Material/MaterialHocs'

describe('The Material Hocs', () => {
  describe('hocs function', () => {
    it('is a higher order function', () => {
      expect(typeof myHoc()).toEqual('function')
    })
  })
})