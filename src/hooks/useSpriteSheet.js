import { useState, useEffect } from "react";
import { Texture } from "pixi.js";
import { useApp } from "@inlet/react-pixi";

const useSpriteSheet = (spritesheet) => {
  const app = useApp();
  const loader = app.loader;
  const [textures, setTextures] = useState();

  useEffect(() => {
    if (!loader.resources[spritesheet]) {
      loader.add(spritesheet).load((_, resource) => {
        const frames = Object.keys(resource[spritesheet].data.frames).map(
          (frame) => Texture.from(frame)
        );
        setTextures(frames);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return textures;
};

export default useSpriteSheet;
