import {
  accelerate$,
  brake$,
  createDistance$,
  createPath$,
  createSpeed$,
  generateRandomPath
} from "./domain/engine";
import { share } from "rxjs/operators";

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
const road$ = createPath$(generateRandomPath(), distance$);

speed$.subscribe(spd => {
  speedElement.innerText = Number(spd).toFixed(1);
});

distance$.subscribe(dst => {
  distanceElement.innerText = Number(dst).toFixed(3);
});

road$.subscribe(console.log);
