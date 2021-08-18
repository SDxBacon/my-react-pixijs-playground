import { useRef, useState } from "react";
import { Rectangle } from "pixi.js";
import { useApp, useTick, Sprite, Container } from "@inlet/react-pixi";

const FRAMES_SETTING = {
  totalFrames: 15,
  frameWidth: 150,
  frameHeight: 204,
};

const FRAME_WIDTH = 150;

/**
 * CardFireSprite component
 */
const CardFireSprite = () => {
  const app = useApp();
  const count = useRef(0);
  const t = app.loader.resources.cardFire.texture;
  t.frame = new Rectangle(0, 0, 150, 204);
  const [texture, setTexture] = useState(t);

  useTick(() => {
    // increase counter
    count.current = (count.current + 1) % FRAMES_SETTING.totalFrames;

    const rect = new Rectangle(
      FRAMES_SETTING.frameWidth * count.current,
      0,
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
      width={FRAME_WIDTH}
    >
      <Sprite texture={texture} anchor={0.5} />
    </Container>
  );
};

export default CardFireSprite;
