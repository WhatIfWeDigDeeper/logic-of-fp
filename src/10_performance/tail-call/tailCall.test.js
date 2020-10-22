import { fibonacci } from './tailCall';

describe('fibonacci', () => {
  it('should return correct fibonacci number', () => {
    [
      {n:0, r:0},
      {n:1, r:1},
      {n:2, r:1},
      {n:3, r:2},
      {n:4, r:3},
      {n:5, r:5},
      {n:6, r:8},
      {n:7, r:13},
      {n:8, r:21},
      {n:9, r:34},
      {n:10, r:55},
      {n:11, r:89},
      {n:12, r:144},
      {n:13, r:233},
      {n:14, r:377},
      {n:15, r:610}
      ].forEach((item) => {
        expect(fibonacci(item.n))
          .toEqual(item.r);
    })
  });
});
