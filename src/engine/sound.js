import Tone from "tone";

let isLoaded = false;

const sampler = new Tone.Sampler(
  {
    C3: require("../audio/wheels/wheel1.wav"),
    D3: require("../audio/wheels/wheel2.wav"),
    E3: require("../audio/wheels/wheel3.wav"),
    F3: require("../audio/wheels/wheel4.wav"),
    G3: require("../audio/wheels/wheel5.wav"),
    A3: require("../audio/wheels/wheel6.wav"),
    B3: require("../audio/wheels/wheel7.wav"),
    C4: require("../audio/wheels/wheel8.wav"),
    D4: require("../audio/wheels/wheel9.wav"),
    E4: require("../audio/wheels/wheelA.wav"),
    F4: require("../audio/wheels/wheelB.wav"),
    G4: require("../audio/wheels/wheelC.wav")
  },
  () => {
    sampler.attack = 0;
    sampler.release = 1;
    isLoaded = true;
  }
).toMaster();

export function playSoundOfWheels(wheels$) {
  wheels$.subscribe(railItem => {
    const wheelNotes = {
      0: ["C3", 0.15],
      1: ["D3", 0.2],
      2: ["E3", 0.33],
      3: ["F3", 0.35],
      4: ["G3", 0.65],
      5: ["A3", 0.7],
      6: ["B3", 1],
      7: ["C4", 1],
      8: ["D4", 0.8],
      9: ["E4", 0.75],
      10: ["F4", 0.45],
      11: ["G4", 0.35]
    };

    const [note, velocity] = wheelNotes[railItem.wheel];

    console.log([railItem.wheel, note, velocity, isLoaded]);

    if (isLoaded) {
      sampler.triggerAttackRelease(note, 0, 0, velocity);
    }
  });
}
