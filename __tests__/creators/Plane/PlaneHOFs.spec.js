import {
} from '../../src/creators/Plane/PlaneHocs'

describe('The Plane Hocs', () => {
  describe('hocs function', () => {
    it('is a higher order function', () => {
      expect(typeof myHoc()).toEqual('function')
    })
  })
})