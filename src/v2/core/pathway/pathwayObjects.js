export function createCoupling(offset) {
  return { offset, type: "coupling" };
}

export function createSpeedLimit(offset, speed) {
  return { offset, type: "limit", speed };
}

export function createStop(offset, duration) {
  return { offset, type: "stop", duration };
}
