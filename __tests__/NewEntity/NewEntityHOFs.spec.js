import {
} from '../src/NewEntity/NewEntityHocs'

describe('The NewEntity Hocs', () => {
  describe('hocs function', () => {
    it('is a higher order function', () => {
      expect(typeof myHoc()).toEqual('function')
    })
  })
})