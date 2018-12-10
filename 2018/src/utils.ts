export const rangeIterable = (min: number, max: number) => ({
  *[Symbol.iterator]() {
    let rangeIterator = range(min, max);
    let rangeResult = rangeIterator.next();

    while (!rangeResult.done) {
      yield rangeResult.value;

      rangeResult = rangeIterator.next();
    }
  }
});

export function* range(min: number, max: number) {
  let current = min;

  while (current < max) {
    yield current;

    current++;
  }
}

export function difference<A>(setA: Set<A>, setB: Set<A>) {
  var _difference = new Set(setA);
  for (var elem of setB) {
    _difference.delete(elem);
  }
  return _difference;
}
