import { of } from "rxjs";
import { map, mergeAll, mergeMap } from "rxjs/operators";
import range from "lodash.range";
import flatten from "lodash.flatten";
import { createStaticPathObservable, generateRandomPath } from "./path";

export const CAIRO_AMOUNT = 2;
export const CAIRO_LENGTH = 24.75;

function calculateWheelsOffsets(offset) {
  const pivotLength = 17;
  const pairDistance = 2.4;

  const halfPairDistance = pairDistance / 2;

  const firstPivotPos = (CAIRO_LENGTH - pivotLength) / 2;
  const secondPivotPos = CAIRO_LENGTH - firstPivotPos;

  const cairoPivots = [
    firstPivotPos - halfPairDistance,
    firstPivotPos + halfPairDistance,
    secondPivotPos - halfPairDistance,
    secondPivotPos + halfPairDistance
  ];

  return cairoPivots.map(it => (it + offset) / 1000);
}

export function createWheelsObserver(distance$) {
  const wheelGroups = range(CAIRO_AMOUNT).map(cairo =>
    calculateWheelsOffsets(cairo * CAIRO_LENGTH)
  );
  const wheels = flatten(wheelGroups);
  const wheelObservables = wheels.map(wheelOffset =>
    createStaticPathObservable(
      generateRandomPath(),
      distance$.pipe(map(d => d + wheelOffset))
    )
  );

  return of(wheelObservables).pipe(
    mergeMap(it => it),
    mergeAll()
  );
}
