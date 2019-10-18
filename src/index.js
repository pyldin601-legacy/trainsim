import {
  accelerate$,
  brake$,
  createDistance$,
  createSpeed$
} from "./domain/engine";
import { createWheelsStream } from "./engine/train";
import { generateStaticRailwayStream } from "./engine/railway";
import { playSoundOfWheels } from "./engine/sound";

const accelerateElement = document.getElementById("accelerate");
const brakeElement = document.getElementById("brake");
const testElement = document.getElementById("test");

const speedElement = document.getElementById("speed");
const distanceElement = document.getElementById("distance");

accelerateElement.addEventListener("mousedown", () => accelerate$.next(true));
accelerateElement.addEventListener("mouseup", () => accelerate$.next(false));

brakeElement.addEventListener("mousedown", () => brake$.next(true));
brakeElement.addEventListener("mouseup", () => brake$.next(false));

const speed$ = createSpeed$(accelerate$, brake$);
const distance$ = createDistance$(speed$);

speed$.subscribe(spd => {
  speedElement.innerText = Number(spd).toFixed(1);
});

distance$.subscribe(dst => {
  distanceElement.innerText = Number(dst).toFixed(3);
});

const railway$ = generateStaticRailwayStream();

const wheels$ = createWheelsStream(railway$, distance$);

playSoundOfWheels(wheels$);
