// import { performance } from 'perf_hooks';
// import { memoize } from 'lodash';

function fibonacci(position: number): number {
  switch (position) {
    case 0:
      return 0;
    case 1:
    case 2:
      return 1;
    default:
      return fibonacci(position - 1) + fibonacci(position - 2);
  }
}

describe('memoization', (): void => {
  it('should call fibonacci', (): void => {
    const result = fibonacci(6);
    expect(result).toBe(8);
  });
});

// function fibonacci(n) {
//     return n < 1 ? 0 : n <= 2 ? 1 : fibonacci(n - 1) + fibonacci(n - 2);
//   }

// function fibTail(position: number, prev = 0, current = 1): number {
//   if (position === 0) {
//     return prev;
//   }
//   if (position <= 2) {
//     return prev + current;
//   }
//   return fibTail(--position, current, prev + current);
// }

// function fibSwitch(position: number, prev = 0, current = 1): number {
//   switch (position) {
//     case 0:
//       return prev;
//     case 1:
//     case 2:
//       return prev + current;
//     default:
//       return fibSwitch(--position, current, prev + current);
//   }
// }

// function fibo(n: number, recurseFibo: RecurseiveFibonacci): number {
//   return n < 1 ? 0 : n <= 2 ? 1 : recurseFibo(n - 1, recurseFibo) + recurseFibo(n - 2, recurseFibo);
// }

// xit('should call fib', (): void => {
//   const tailResult = fibTail(6);
//   expect(tailResult).toBe(8);
//   const max = 100;

//   const startTime = performance.now();
//   for (let i = 0; i < max; i++) {
//     fibonacci(6);
//   }
//   const endTime = performance.now();

//   const switchResult = fibSwitch(6);
//   expect(switchResult).toBe(8);

//   // tslint:disable-next-line no-console
//   console.log('regular', endTime - startTime);

//   const nonTailResult = fibonacci(6);
//   expect(nonTailResult).toBe(8);

//   const memFibonacci = memoize(fibonacci);
//   const startMemTime = performance.now();
//   for (let i = 0; i < max; i++) {
//     memFibonacci(6);
//   }
//   const endMemTime = performance.now();
//   // tslint:disable-next-line no-console
//   console.log('mem', endMemTime - startMemTime);

//   memFibonacci(6);
//   const memResult = memFibonacci(6);
//   expect(memResult).toBe(8);
// });
// it('should compare performance', (): void => {
//   const max = 10;

//   const memFibonacci = memoize(fibonacci);
//   const startMemTime = performance.now();
//   for (let i = 0; i < max; i++) {
//     memFibonacci(6);
//   }
//   const endMemTime = performance.now();
//   const memDuration = endMemTime - startMemTime;
//   // tslint:disable-next-line no-console
//   console.log('mem', memDuration);

//   const startTime = performance.now();
//   for (let i = 0; i < max; i++) {
//     fibonacci(6);
//   }
//   const endTime = performance.now();
//   const standardDuration = endTime - startTime;
//   // tslint:disable-next-line no-console
//   console.log('std', standardDuration);

//   expect(memDuration).toBeLessThan(standardDuration);
// });
