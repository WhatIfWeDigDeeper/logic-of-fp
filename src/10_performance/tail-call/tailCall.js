// modified from http://benignbemine.github.io/2015/07/19/es6-tail-calls/
const fibRecursive = (n, a, b) => {
  if (n === 0) {
    return b;
  } else {
    return fibRecursive(n-1, a + b, a);
  }
};

export const fibonacci = n => fibRecursive(n, 1, 0);
