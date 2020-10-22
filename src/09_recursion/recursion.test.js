import {
  powTail,
  recursiveSum,
  tailRecursiveSum
} from './recursion';

describe('recursion v. tail recursion', () => {

  it('should sum an array with normal recursion', () => {
    const ary = [10, 20, 30, 40];
    expect(
      recursiveSum(ary)
    ).toBe(100);
  });

  it('should sum an array with tail recursion', () => {
    const ary = [10, 20, 30, 40];
    expect(
      tailRecursiveSum(ary)
    ).toBe(100);
  });

  it('should raise 10 to power with tail recursion ', () => {
    expect(
      powTail(10, 2)
    ).toEqual(100);
  });
  it('should raise 2 to power 8 with tail recursion ', () => {
    expect(
      powTail(2, 8)
    ).toEqual(256);
  });
  it('should raise to power with tail recursion ', () => {
    expect(
      powTail(10, 0)
    ).toEqual(1);
  });

});


