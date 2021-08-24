import { useRef, useState } from "react";
import { Rectangle } from "pixi.js";
import { useApp, useTick, Sprite, Container } from "@inlet/react-pixi";

const FRAMES_SETTING = {
  totalFrames: 60,
  framesInRow: 15,
  frameWidth: 271,
  frameHeight: 440,
};

/**
 * CardFireSprite component
 */
const CardFireSprite = () => {
  const app = useApp();
  const count = useRef(0);
  const t = app.loader.resources.cardFire.texture;
  t.frame = new Rectangle(0, 0, 150, 204);
  const [texture, setTexture] = useState(t);

  useTick((delta) => {
    // increase counter
    count.current = (count.current + 1) % FRAMES_SETTING.totalFrames;

    const x =
      (count.current % FRAMES_SETTING.framesInRow) * FRAMES_SETTING.frameWidth;
    const y =
      Math.floor(count.current / FRAMES_SETTING.framesInRow) *
      FRAMES_SETTING.frameHeight;

    const rect = new Rectangle(
      x,
      y,
      FRAMES_SETTING.frameWidth,
      FRAMES_SETTING.frameHeight
    );
    app.loader.resources.cardFire.texture.frame = rect;
    setTexture(t);
  });

  return (
    <Container
      x={app.renderer.view.width / 2}
      y={app.renderer.view.height / 2}
      width={FRAMES_SETTING.frameWidth}
      height={FRAMES_SETTING.frameHeight}
    >
      <Sprite texture={texture} anchor={0.5} />
    </Container>
  );
};

export default CardFireSprite;
