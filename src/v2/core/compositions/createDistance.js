import { scan, withLatestFrom } from "rxjs/operators";

export default function createDistance(speed$, timeFrame$) {
  return timeFrame$.pipe(
    withLatestFrom(speed$),
    scan((distance, [deltaTime, speed]) => {
      const speedPerSecond = speed / 3600;
      const frameDistance = (speedPerSecond / 1000) * deltaTime;
      return distance + frameDistance;
    }, 0)
  );
}
