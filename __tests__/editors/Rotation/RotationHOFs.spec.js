import {
} from '../../src/editors/Rotation/RotationHocs'

describe('The Rotation Hocs', () => {
  describe('hocs function', () => {
    it('is a higher order function', () => {
      expect(typeof myHoc()).toEqual('function')
    })
  })
})