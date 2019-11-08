import { map, pairwise } from "rxjs/operators";

export default function createTimeFrame(timer$) {
  return timer$.pipe(
    map(() => Date.now()),
    pairwise(),
    map(([t1, t2]) => t2 - t1)
  );
}
