describe('Pure functions', (): void => {
  const range = (n: number, start: number = 0): number[] =>
    Array(n)
      .fill(0)
      .map((_, i) => i + 1 + start);

  describe('idempotent or referential transparency or pure', (): void => {
    const increment = (x: number): number => x + 1;

    it('should return the same result for the same input', (): void => {
      let result = increment(5);
      expect(result).toEqual(6);
      result = increment(5);
      expect(result).toEqual(6);
    });

    it.each(range(100))(
      'is insanity to do the same thing 100x and expect a different result: %s',
      (_: number) => {
        expect(increment(5)).toEqual(6);
      }
    );

    it.each(range(10))(
      'all work and no play make Jack a dull boy: %s',
      (_: number) => {
        expect(increment(5)).toEqual(6);
      }
    );
  });
  describe('non-idempotent, side effects, opaque (impure)', (): void => {
    let counter = 0;
    function incremental(x: number): number {
      // opaque: reaches outside the function
      counter += 1;
      return counter + x;
    }

    it('should return a different result', (): void => {
      let result = incremental(5);
      expect(result).toEqual(6);
      result = incremental(5);
      expect(result).not.toEqual(6);
    });
  });
});
