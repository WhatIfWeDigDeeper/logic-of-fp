function* fibonacci() {
  let current;
  let a = 1;
  let b = 1;

  yield 1;

  while (true) {
    current = b;

    yield current;

    b = a + b;
    a = current;
  }
}

function* range(start, finish) {
  for(let i = start; i <= finish; i++) {
    yield i;
  }
}

describe('lazy evaluation', () => {

  describe('range', () => {
    it('should lazily evaluate infinite series and return only the next sequence', () => {
      let r = range(1, Number.POSITIVE_INFINITY);
      expect(r.next().value).toEqual(1);
      expect(r.next().value).toEqual(2);
      expect(r.next().value).toEqual(3);
    });

    it('should use "for of" construct to iterate over iterable', () => {

      let sum = 0;
      for(const n of range(1, 10)) {
        sum += n;
      }
      expect(sum)
        .toEqual(55);
    });
  });

  describe('fibonacci sequence', () => {
    const fib = fibonacci();
    it('should get the next sequence', (): void => {
      expect(fib.next().value).toEqual(1);
      expect(fib.next().value).toEqual(1);
      expect(fib.next().value).toEqual(2);
      expect(fib.next().value).toEqual(3);
      expect(fib.next().value).toEqual(5);
      expect(fib.next().value).toEqual(8);
        expect().toEqual();
    });
  });

});





