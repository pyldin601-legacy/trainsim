import Tone from "tone";
import { not } from "rxjs/internal-compatibility";

const sampler = new Tone.Sampler(
  {
    C3: require("../audio/wheels/wheel1.wav"),
    D3: require("../audio/wheels/wheel2.wav"),
    E3: require("../audio/wheels/wheel3.wav"),
    F3: require("../audio/wheels/wheel4.wav"),
    G3: require("../audio/wheels/wheel5.wav"),
    A3: require("../audio/wheels/wheel6.wav"),
    B3: require("../audio/wheels/wheel7.wav")
  },
  {
    release: 1
  }
).toMaster();

export function playSoundOfWheels(wheels$) {
  let s;
  wheels$.subscribe(railItem => {
    const note = {
      0: "C3",
      1: "D3",
      2: "E3",
      3: "F3",
      4: "G3",
      5: "A3",
      6: "B3"
    };
    sampler.triggerAttackRelease(note[railItem.wheel] || "C3");
  });
}
