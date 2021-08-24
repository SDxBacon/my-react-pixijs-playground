import { useState, useEffect } from "react";
import { Texture } from "pixi.js";
import { useApp, useTick } from "@inlet/react-pixi";
import useJetFighterMotion from "hooks/useJetFighterMotion";
import { LEVEL_TURNING, STEEP_TURN_LEFT, STEEP_TURN_RIGHT } from "./constants";

const useJetFighter = (containerRef) => {
  const app = useApp();
  const config = useJetFighterMotion(containerRef);
  const [textures, setTextures] = useState();
  const [currentTexture, setCurrentTexture] = useState();
  const [historical, setHistorical] = useState([]);

  useTick(() => {});

  useEffect(() => {
    if (app.loader.resources.jetFighter) {
      const frames = Object.keys(
        app.loader.resources.jetFighter.data.frames
      ).map((frame) => Texture.from(frame));
      setTextures(frames);
      setCurrentTexture(frames[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [app.loader.resources]);

  return {
    x: config.x,
    texture: currentTexture,
  };
};

export default useJetFighter;
