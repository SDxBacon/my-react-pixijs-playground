import { useRef, useState, useEffect } from "react";
import { Texture } from "pixi.js";
import { Container, Sprite } from "@inlet/react-pixi";
import useJetFighter from "../../hooks/useJetFighter";

const [width, height] = [500, 500];

const JetFighter = () => {
  const temp = useRef(true);
  const frameCount = useRef(0);
  const [texture, setTexture] = useState();
  const textures = useJetFighter();

  useEffect(() => {
    if (textures?.length > 0) {
      setTexture(textures[0]);
    }
  }, [textures]);

  useEffect(() => {
    if (texture && texture instanceof Texture) {
      const timer = setTimeout(() => {
        const nextFrame = temp.current
          ? frameCount.current + 1
          : frameCount.current - 1;
        setTexture(textures[frameCount.current + 1]);
        frameCount.current = nextFrame;

        if (frameCount.current > 10) {
          temp.current = false;
        } else if (frameCount.current < 0) {
          temp.current = true;
        }
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [textures, texture]);

  if (texture instanceof Texture) {
    return (
      <Container x={width / 2} y={height / 2}>
        <Sprite texture={texture} anchor={0.5} />
      </Container>
    );
  }

  return null;
};

export default JetFighter;
