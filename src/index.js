import {
  accelerate$,
  brake$,
  createDistance$,
  createSpeed$
} from "./domain/engine";
import { createWheelsObserver } from "./engine/train";
import Pizzicato from "pizzicato";


const accelerateElement = document.getElementById("accelerate");
const brakeElement = document.getElementById("brake");

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

const wheels$ = createWheelsObserver(distance$);

wheels$.subscribe(wheel => {
  const wheel1 = new Pizzicato.Sound(require("./audio/wheel1.wav"), () => wheel1.play());
});
