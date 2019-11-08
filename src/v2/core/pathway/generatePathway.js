import { from } from "rxjs";
import { createCoupling } from "./objects";

const RAIL1_LENGTH = 0.025;
const RAIL2_LENGTH = 0.05;
const RAIL3_LENGTH = 0.1;
const RAIL4_LENGTH = 0.5;
const RAIL5_LENGTH = 1;

export default function generatePathway() {
  const railItems = [];

  for (let i = 1; i < 100; i += 1) {
    railItems.push(createCoupling(i * RAIL1_LENGTH));
  }

  return from(railItems);
}
