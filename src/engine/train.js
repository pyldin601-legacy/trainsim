import range from "lodash.range";
import flatten from "lodash.flatten";
import { map, mergeAll, mergeMap } from "rxjs/operators";
import { of } from "rxjs";

export const CAIRO_AMOUNT = 2;
export const CAIRO_LENGTH = 24.75;

function calculateWheelsOffsets(offset) {
  const pivotLength = 17;
  const pairDistance = 1.524;

  const halfPairDistance = pairDistance / 2;

  const firstPivotPos = (CAIRO_LENGTH - pivotLength) / 2;
  const secondPivotPos = CAIRO_LENGTH - firstPivotPos;

  const cairoPivots = [
    firstPivotPos - halfPairDistance,
    firstPivotPos + halfPairDistance,
    secondPivotPos - halfPairDistance,
    secondPivotPos + halfPairDistance
  ];

  return cairoPivots.map(it => it + offset);
}

export function createWheels$(createPath$, distance$) {
  const wheelGroups = range(CAIRO_AMOUNT).map(cairo =>
    calculateWheelsOffsets(cairo * CAIRO_LENGTH)
  );
  const wheels = flatten(wheelGroups);
  const paths$$ = wheels.map(d =>
    createPath$(distance$.pipe(map(dd => dd + d / 1000)))
  );
  return of(paths$$).pipe(
    mergeMap(it => it),
    mergeAll()
  );
}
