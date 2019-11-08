import { distinctUntilChanged, scan, withLatestFrom } from "rxjs/operators";
import { ACCELERATE_SPEED, BRAKE_SPEED, MAX_SPEED } from "../constants";

export default function createSpeed(accelerate$, brake$, timeFrame$) {
  return timeFrame$.pipe(
    withLatestFrom(accelerate$, brake$),
    scan((prevSpeed, [deltaTime, isAccelerating, isBraking]) => {
      if (isAccelerating) {
        const currentAccSpeed = (ACCELERATE_SPEED / 1000) * deltaTime;
        return Math.min(MAX_SPEED, prevSpeed + currentAccSpeed);
      }
      if (isBraking) {
        const currentBrkSpeed = (BRAKE_SPEED / 1000) * deltaTime;
        return Math.max(0, prevSpeed - currentBrkSpeed);
      }
      return prevSpeed;
    }, 0),
    distinctUntilChanged()
  );
}
