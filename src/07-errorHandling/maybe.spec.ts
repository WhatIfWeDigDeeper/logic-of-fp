// from https://medium.com/@dhruvrajvanshi/simulating-haskells-do-notation-in-typescript-e48a9501751c
export class Maybe<A> {
  private constructor(private _value: A | null) {}

  public then<B>(f: (_: A) => Maybe<B>): Maybe<B> {
    return this.match({
      Just: (x) => f(x),
      Nothing: () => Maybe.Nothing<B>(),
    });
  }

  public static Just<T>(a: T): Maybe<T> {
    return new Maybe(a);
  }

  public static Nothing<T>(): Maybe<T> {
    return new Maybe<T>(null);
  }

  public match<B>(cases: { Just: (a: A) => B; Nothing: () => B }): B {
    if (this._value !== null) {
      return cases.Just(this._value);
    } else {
      return cases.Nothing();
    }
  }

  public assign<K extends string, B>(
    k: K,
    other: Maybe<B> | ((a: A) => Maybe<B>)
  ): Maybe<A & { [k in K]: B }> {
    return this.then((a) => {
      const maybe = other instanceof Maybe ? other : other(a);
      return maybe.then((b) =>
        Maybe.Just(Object.assign({}, a, { [k.toString()]: b }) as any)
      );
    });
  }
}
function positive(x: number): Maybe<number> {
  if (x >= 0) {
    return Maybe.Just(x);
  } else {
    return Maybe.Nothing();
  }
}

describe('Maybe', (): void => {
  it('expect positive to return Just', (): void => {
    positive(23).match({
      Just: (x) => expect(x).toBe(23),
      Nothing: () => fail('Should be Just(23)'),
    });
  });
  it('expect negative to return Nothing', (): void => {
    positive(-23).match({
      Just: (_) => fail('should be Nothing'),
      Nothing: () => expect(true).toBeTruthy(),
    });
  });
});
