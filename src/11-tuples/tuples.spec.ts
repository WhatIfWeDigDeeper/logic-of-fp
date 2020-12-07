describe('tuples', (): void => {
  it('should return a tuple from Object.entries', (): void => {
    const sortFields = { lastName: 1, age: -1 };
    const result: [string, number][] = Object.entries(sortFields).map((x) => x);
    expect(result).toEqual([
      ['lastName', 1],
      ['age', -1],
    ]);
  });
});
