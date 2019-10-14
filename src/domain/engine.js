import { animationFrameScheduler, BehaviorSubject, interval } from "rxjs";
import {
  map,
  pairwise,
  scan,
  withLatestFrom,
  distinctUntilChanged,
  switchMap
} from "rxjs/operators";
import { partition } from "lodash";

const MAX_SPEED = 90;
const ACCELERATE_SPEED = 1;
const BRAKE_SPEED = 1;

export const accelerate$ = new BehaviorSubject(false);

export const brake$ = new BehaviorSubject(false);

export const frame$ = interval(0, animationFrameScheduler).pipe(
  map(() => Date.now()),
  pairwise(),
  map(([t1, t2]) => t2 - t1)
);

export function createSpeedObservable(accelerate$, brake$) {
  return frame$.pipe(
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

export function createDistanceObservable(speed$) {
  return frame$.pipe(
    withLatestFrom(speed$),
    scan((distance, [deltaTime, speed]) => {
      const speedPerSecond = speed / 3600;
      const frameDistance = (speedPerSecond / 1000) * deltaTime;
      return distance + frameDistance;
    }, 0)
  );
}

export function createPathObservable(road, distance$) {
  const _road = [...road];

  return distance$.pipe(
    switchMap(currDistance => {
      let roadObjects = [];

      while (_road.length > 0 && _road[0].distance <= currDistance) {
        roadObjects.push(_road.shift());
      }

      return roadObjects;
    })
  );
}

export const pathExample = [
  { distance: 0.001, type: null },
  { distance: 0.01, type: null },
  { distance: 0.03, type: null },
  { distance: 0.04, type: null }
];
