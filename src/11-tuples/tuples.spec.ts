describe('tuples', (): void => {
  it('should return a tuple from Object.entries', (): void => {
    const sortFields = { lastName: 1, age: -1 };

    const result: [string, number][] = Object.entries(sortFields).map((x) => x);

    expect(result).toEqual([
      ['lastName', 1],
      ['age', -1],
    ]);
  });

  it('should return a tuple from Object.entries', (): void => {
    // @ts-ignore
    const identity = (x) => x;

    const sortFields = { lastName: 1, age: -1 };

    const result: [string, number][] = Object.entries(sortFields).map(identity);

    expect(result).toEqual([
      ['lastName', 1],
      ['age', -1],
    ]);
  });

  it('should return a tuple from Object.entries', (): void => {
    const identity = <T>(x: T) => x;

    const sortFields = { lastName: 1, age: -1 };

    const result: [string, number][] = Object.entries(sortFields).map(identity);

    expect(result).toEqual([
      ['lastName', 1],
      ['age', -1],
    ]);
  });
});
