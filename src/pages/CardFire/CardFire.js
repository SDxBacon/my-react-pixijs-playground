import Stage from "components/Stage";
import { CARD_FIRE_ASSETS } from "assets_map";
import CardFireSprite from "./components/CardFireSprite";

const CardFire = () => {
  return (
    <Stage assets={CARD_FIRE_ASSETS}>
      <CardFireSprite />
    </Stage>
  );
};

export default CardFire;
