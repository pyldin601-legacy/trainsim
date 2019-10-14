import {
  accelerate$,
  brake$,
  calculateWheelsOffsets,
  createDistance$,
  createPath$,
  createSpeed$,
  generateRandomPath
} from "./domain/engine";
import { mergeAll, share, map, mergeMap } from "rxjs/operators";
import { of } from "rxjs";

const accelerateElement = document.getElementById("accelerate");
const brakeElement = document.getElementById("brake");

const speedElement = document.getElementById("speed");
const distanceElement = document.getElementById("distance");

accelerateElement.addEventListener("mousedown", () => accelerate$.next(true));
accelerateElement.addEventListener("mouseup", () => accelerate$.next(false));

brakeElement.addEventListener("mousedown", () => brake$.next(true));
brakeElement.addEventListener("mouseup", () => brake$.next(false));

const speed$ = createSpeed$(accelerate$, brake$).pipe(share());
const distance$ = createDistance$(speed$).pipe(share());

speed$.subscribe(spd => {
  speedElement.innerText = Number(spd).toFixed(1);
});

distance$.subscribe(dst => {
  distanceElement.innerText = Number(dst).toFixed(3);
});

const wheels = calculateWheelsOffsets(0);
console.log(wheels);

const all$ = of(
  wheels.map(d =>
    createPath$(generateRandomPath(), distance$.pipe(map(dd => dd + d / 1000)))
  )
).pipe(
  mergeMap(it => it),
  mergeAll()
);

all$.subscribe(console.log);
