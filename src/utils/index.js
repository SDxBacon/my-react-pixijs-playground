import { easePolyOut } from "d3-ease";
import { linearInterpolate } from "./helper";

const easingFn = easePolyOut.exponent(4.0);

export const MIN_VELOCITY = 0;

export const MAX_VELOCITY = 25;

export function calcVelocity(a, b, n) {
  return linearInterpolate(a, b, easingFn(n));
}
