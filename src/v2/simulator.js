import accelerate$ from "./core/inputs/accelerate";
import brake$ from "./core/inputs/brake";
import timer$ from "./core/inputs/timer";
import createTimeFrame from "./core/compositions/createTimeFrame";
import createSpeed from "./core/compositions/createSpeed";
import createDistance from "./core/compositions/createDistance";
import indexPathwayObjectsByWheels from "./core/train/indexPathwayObjectsByWheels";
import generatePathwayObjects from "./core/pathway/generatePathway";
import playPathwayObjectsStream from "./core/sound/playPathwayObjectsStream";

// Realtime Streams
const timeFrame$ = createTimeFrame(timer$);
const speed$ = createSpeed(accelerate$, brake$, timeFrame$);
const distance$ = createDistance(speed$, timeFrame$);

const pathwayObjects$ = generatePathwayObjects();
const indexedPathwayObjects$ = indexPathwayObjectsByWheels(
  pathwayObjects$,
  distance$
);

// Sound FX
playPathwayObjectsStream(indexedPathwayObjects$);

// DOM Elements Interaction
const accelerateElement = document.getElementById("accelerate");
const brakeElement = document.getElementById("brake");
const speedElement = document.getElementById("speed");
const distanceElement = document.getElementById("distance");

accelerateElement.addEventListener("mousedown", () => accelerate$.next(true));
accelerateElement.addEventListener("mouseup", () => accelerate$.next(false));
brakeElement.addEventListener("mousedown", () => brake$.next(true));
brakeElement.addEventListener("mouseup", () => brake$.next(false));

speed$.subscribe(it => (speedElement.innerText = Number(it).toFixed(1)));
distance$.subscribe(it => (distanceElement.innerText = Number(it).toFixed(3)));
