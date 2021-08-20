import { useState } from "react";
import { produce } from "immer";
import { useApp, useTick, Sprite } from "@inlet/react-pixi";
import { initializeStars, randomizeStar } from "utils/stars";
import {
  fov,
  STARTS_AMOUNT,
  BASE_SPEED,
  STAR_STRETCH,
  STAR_BASE_SIZE,
} from "constants/stars";

const INIT_STARS = initializeStars();

const StarWarp = () => {
  const app = useApp();
  const starTexture = app.loader.resources.star.texture;
  const [speed, setSpeed] = useState(1.2);
  const [cameraZ, setCameraZ] = useState(0);
  const [stars, setStars] = useState(INIT_STARS);

  useTick((delta) => {
    const screenWidth = app.renderer.screen.width;
    const screenHeight = app.renderer.screen.height;

    // Simple easing. This should be changed to proper easing function when used for real.
    const nextSpeed = 1;
    // const nextSpeed = speed + (warpSpeed - speed) / 20;
    const nextCameraZ = cameraZ + delta * 10 * (nextSpeed + BASE_SPEED);

    const nextStars = produce(stars, (draft) => {
      for (let i = 0; i < STARTS_AMOUNT; i++) {
        let currStar = draft[i];
        if (currStar.z < nextCameraZ) {
          const { x, y, z } = randomizeStar(nextCameraZ);
          currStar.x = x;
          currStar.y = y;
          currStar.z = z;
        }

        // Map star 3d position to 2d with really simple projection
        const z = currStar.z - nextCameraZ;
        currStar.sprite.x =
          currStar.x * (fov / z) * screenWidth + screenWidth / 2;
        currStar.sprite.y =
          currStar.y * (fov / z) * screenWidth + screenHeight / 2;

        // Calculate star scale & rotation.
        const dxCenter = currStar.sprite.x - screenWidth / 2;
        const dyCenter = currStar.sprite.y - screenHeight / 2;
        const distanceCenter = Math.sqrt(
          dxCenter * dxCenter + dyCenter * dyCenter
        );
        const distanceScale = Math.max(0, (2000 - z) / 2000);

        // Star is looking towards center so that y axis is towards center.
        // Scale the star depending on how fast we are moving, what the stretchfactor is and depending on how far away it is from the center.
        const scaleX = distanceScale * STAR_BASE_SIZE;
        const scaleY =
          distanceScale * STAR_BASE_SIZE +
          (distanceScale * speed * STAR_STRETCH * distanceCenter) / screenWidth;

        currStar.sprite.scale = [scaleX, scaleY];
        currStar.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2;
      }
    });

    setSpeed(nextSpeed);
    setStars(nextStars);
    setCameraZ(nextCameraZ);
  });

  return stars.map((star, index) => {
    return (
      <Sprite texture={starTexture} key={`star-${index}`} {...star.sprite} />
    );
  });
};

export default StarWarp;
