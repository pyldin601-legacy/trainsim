import { from } from "rxjs";
import { mergeMap, share, first, mapTo } from "rxjs/operators";

const RAIL1_LENGTH = 0.025;
const RAIL2_LENGTH = 0.05;
const RAIL3_LENGTH = 0.1;
const RAIL4_LENGTH = 0.5;
const RAIL5_LENGTH = 1;

function createCoupling(offset) {
  return { offset, type: "coupling" };
}

function createSpeedLimit(offset, speed) {
  return { offset, type: "limit", speed };
}

function createStop(offset, duration) {
  return { offset, type: "stop", duration };
}

export function createStaticRailway(railItems) {
  return from(railItems);
}

export function generateStaticRailwayStream() {
  const railItems = [];

  for (let i = 1; i < 100; i += 1) {
    railItems.push(createCoupling(i * RAIL1_LENGTH));
  }

  railItems.push(createStop(100 * RAIL1_LENGTH));

  return createStaticRailway(railItems);
}

export function synchronizeWithDistance(distance$) {
  const sharedDistance$ = distance$.pipe(share());
  return mergeMap(
    it =>
      sharedDistance$.pipe(
        first(d => d >= it.offset),
        mapTo(it)
      ),
    1
  );
}
