import { of } from "rxjs";
import { map, mergeAll, mergeMap } from "rxjs/operators";
import range from "lodash.range";
import flatten from "lodash.flatten";
import { synchronizeWithDistance } from "./railway";

export const CAIRO_AMOUNT = 4;
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

export function createWheelsStream(railway$, distance$) {
  const wheelGroups = range(CAIRO_AMOUNT).map(cairo =>
    calculateWheelsOffsets(cairo * CAIRO_LENGTH)
  );
  const wheels = flatten(wheelGroups).reverse();

  const wheelsObservables = wheels.map((wheelOffset, i) => {
    const distanceWithDelay$ = distance$.pipe(map(d => d + wheelOffset));
    return railway$.pipe(
      synchronizeWithDistance(distanceWithDelay$),
      map(item => {
        item["wheel"] = i;
        return item;
      })
    );
  });

  return of(wheelsObservables).pipe(
    mergeMap(it => it),
    mergeAll()
  );
}
