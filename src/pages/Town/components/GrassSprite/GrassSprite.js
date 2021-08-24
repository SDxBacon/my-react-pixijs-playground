import { useApp, Sprite } from "@inlet/react-pixi";

const GrassSprite = () => {
  const app = useApp();

  return <Sprite texture={app.loader.resources.town_grass.texture} />;
};

export default GrassSprite;
