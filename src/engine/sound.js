import Tone from "tone";

let isLoaded = false;

const sampler = new Tone.Sampler(
  {
    C3: require("../audio/wheels/wheel4.wav"),
    D3: require("../audio/wheels/wheel4.wav"),
    E3: require("../audio/wheels/wheel5.wav"),
    F3: require("../audio/wheels/wheel5.wav"),
    G3: require("../audio/wheels/wheel6.wav"),
    A3: require("../audio/wheels/wheel6.wav"),
    B3: require("../audio/wheels/wheelC.wav"),
    C4: require("../audio/wheels/wheelC.wav"),
    D4: require("../audio/wheels/wheelD.wav"),
    E4: require("../audio/wheels/wheelD.wav"),
    F4: require("../audio/wheels/wheelE.wav"),
    G4: require("../audio/wheels/wheelE.wav"),
    A4: require("../audio/wheels/wheelF.wav"),
    B4: require("../audio/wheels/wheelF.wav"),
    C5: require("../audio/wheels/wheelG.wav"),
    D5: require("../audio/wheels/wheelG.wav")
  },
  () => {
    isLoaded = true;
  }
).toMaster();

export function playSoundOfWheels(wheels$) {
  wheels$.subscribe(railItem => {
    const wheelNotes = {
      0: ["C3", 0.05],
      1: ["D3", 0.08],
      2: ["E3", 0.1],
      3: ["F3", 0.2],
      4: ["G3", 0.4],
      5: ["A3", 0.5],
      6: ["B3", 1],
      7: ["C4", 1],
      8: ["D4", 0.8],
      9: ["E4", 0.8],
      10: ["F4", 0.25],
      11: ["G4", 0.1],
      12: ["A4", 0.1],
      13: ["B4", 0.05],
      14: ["C5", 0.05],
      15: ["D5", 0.03],
    };

    const [note, velocity] = wheelNotes[railItem.wheel];

    console.log(railItem.wheel, note, velocity, isLoaded);

    if (isLoaded) {
      sampler.triggerAttackRelease(note, 1, undefined, velocity);
    }
  });
}
