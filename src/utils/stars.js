import { STARTS_AMOUNT } from "constants/stars";

export function randomizeStar(cameraZ, initial) {
  // Calculate star positions with radial random coordinate so no star hits the camera.
  const deg = Math.random() * Math.PI * 2;
  const distance = Math.random() * 50 + 1;

  const z = initial
    ? Math.random() * 2000
    : cameraZ + Math.random() * 1000 + 2000;

  return {
    x: Math.cos(deg) * distance,
    y: Math.sin(deg) * distance,
    z,
  };
}

export const initializeStars = () => {
  const stars = [];

  for (let i = 0; i < STARTS_AMOUNT; i += 1) {
    const { x, y, z } = randomizeStar(null, true);
    const star = {
      x,
      y,
      z,
      sprite: {
        anchor: [0.5, 0.7],
      },
    };
    stars.push(star);
  }

  return stars;
};
