import { TOWN_ASSETS } from "assets_map";
import Stage from "components/Stage";
import GrassSprite from "./components/GrassSprite";

const Town = () => {
  return (
    <Stage assets={TOWN_ASSETS}>
      <GrassSprite />
    </Stage>
  );
};

export default Town;
