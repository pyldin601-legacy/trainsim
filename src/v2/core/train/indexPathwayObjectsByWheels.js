import { of } from "rxjs";
import range from "lodash.range";
import flatten from "lodash.flatten";
import {
  CAIRO_AMOUNT,
  CAIRO_LENGTH,
  CAIRO_PIVOT_LENGTH,
  CAIRO_WHEEL_PAIR_LENGTH
} from "../constants";
import { map, mergeAll, mergeMap } from "rxjs/operators";
import synchronizePathway from "../compositions/synchronizePathway";

function getCairoWheelsOffsets(initialOffset) {
  const halfPairDistance = CAIRO_WHEEL_PAIR_LENGTH / 2;
  const firstPivotPos = (CAIRO_LENGTH - CAIRO_PIVOT_LENGTH) / 2;
  const secondPivotPos = CAIRO_LENGTH - firstPivotPos;

  const cairoPivots = [
    firstPivotPos - halfPairDistance,
    firstPivotPos + halfPairDistance,
    secondPivotPos - halfPairDistance,
    secondPivotPos + halfPairDistance
  ];

  return cairoPivots.map(it => (it + initialOffset) / 1000);
}

export default function indexPathwayObjectsByWheels(pathway$, distance$) {
  const wheelGroups = range(CAIRO_AMOUNT).map(cairo =>
    getCairoWheelsOffsets(cairo * CAIRO_LENGTH)
  );
  const wheels = flatten(wheelGroups).reverse();

  const wheelsObservables = wheels.map((wheelOffset, i) => {
    const distanceWithDelay$ = distance$.pipe(map(d => d + wheelOffset));
    return synchronizePathway(pathway$, distanceWithDelay$).pipe(
      map(item => {
        item["index"] = i;
        return item;
      })
    );
  });

  return of(wheelsObservables).pipe(
    mergeMap(it => it),
    mergeAll()
  );
}
