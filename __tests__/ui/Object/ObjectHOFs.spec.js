import {
} from '../../src/ui/Object/ObjectHocs'

describe('The Object Hocs', () => {
  describe('hocs function', () => {
    it('is a higher order function', () => {
      expect(typeof myHoc()).toEqual('function')
    })
  })
})