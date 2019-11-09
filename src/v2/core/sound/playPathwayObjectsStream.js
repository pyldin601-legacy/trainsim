import Tone from "tone";
import { filter, tap, withLatestFrom } from "rxjs/operators";

const WHEELS_VOLUME = [0.5, 0.5, 0.1, 1, 0.1, 0.1, 0.5, 0.5];
const WHEELS_PANNING = [-1, -0.8, -0.75, -0.2, 0.2, 0.75, 0.8, 1];
const WHEELS_COUNT = 8;

function createWheelPlayers() {
  const samplerPromises = [];

  for (let i = 0; i < WHEELS_COUNT; i += 1) {
    const panLevel = WHEELS_PANNING[i];
    const volLevel = WHEELS_VOLUME[i];
    const panVol = new Tone.Panner(panLevel).toMaster();

    samplerPromises.push(
      new Promise(resolve => {
        const sampler = new Tone.Sampler(
          { C4: require("../../../audio/wheel/wheel0a.wav") },
          () => resolve(sampler)
        );
        sampler.connect(panVol);
      })
    );
  }

  return Promise.all(samplerPromises).then(samplers => {
    return samplers.map((it, index) => () =>
      it.triggerAttackRelease("C4", 1, undefined, 1)
    );
  });
}

export default function playPathwayObjects(pathwayObjects$) {
  const players = createWheelPlayers();

  pathwayObjects$
    .pipe(
      filter(({ type }) => type === "coupling"),
      withLatestFrom(players),
      tap(([{ index }, players]) => {
        const playWheelSound = players[index];
        playWheelSound();
      })
    )
    .subscribe();

  // .subscribe(railItem => {
  //   players.then(it => it(railItem.index));

  // const indexTones = {
  //   0: ["C4", 0.85],
  //   1: ["C4", 0.88],
  //   2: ["C4", 0.9],
  //   3: ["C4", 1],
  //   4: ["G3", 0.3],
  //   5: ["A3", 0.2],
  //   6: ["B3", 0.02],
  //   7: ["C4", 0.01]
  // };
  //
  // const [note, velocity] = indexTones[railItem.index];
  //
  // if (isLoaded) {
  //   sampler.triggerAttackRelease(note, 1, undefined, velocity);
  // }
  // });
}
