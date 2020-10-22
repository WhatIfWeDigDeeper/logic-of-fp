function fibonacci(n) {
  return n < 1 ? 0
    : n <= 2 ? 1
      : fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(4));

function fib(n, prev = 0, current = 1) {
  return !n ? prev + current : fib(--n, current, prev+current)
}
