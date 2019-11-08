import { first, mapTo, mergeMap, share } from "rxjs/operators";

export default function synchronizePathway(pathway$, distance$) {
  const sharedDistance$ = distance$.pipe(share());

  return pathway$.pipe(
    mergeMap(
      it =>
        sharedDistance$.pipe(
          first(d => d >= it.offset),
          mapTo(it)
        ),
      1
    )
  );
}
