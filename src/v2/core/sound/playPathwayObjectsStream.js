import Tone from "tone";

let isLoaded = false;

const sampler = new Tone.Sampler(
  {
    C4: require("../../../audio/wheel/wheel0a.wav")
  },
  () => {
    isLoaded = true;
  }
).toMaster();

export default function playPathwayObjects(pathwayObjects$) {
  pathwayObjects$.subscribe(railItem => {
    const wheelNotes = {
      0: ["C4", 0.85],
      1: ["C4", 0.88],
      2: ["C4", 0.9],
      3: ["C4", 1],
      4: ["G3", 0.3],
      5: ["A3", 0.2],
      6: ["B3", 0.02],
      7: ["C4", 0.01]
    };

    const [note, velocity] = wheelNotes[railItem.index];

    if (isLoaded) {
      sampler.triggerAttackRelease(note, 1, undefined, velocity);
    }
  });
}
