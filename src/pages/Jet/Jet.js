import Stage from "components/Stage";
import { JET_ASSETS } from "assets_map";
import StarWarp from "./components/StarWarp";
import JetFighter from "./components/JetFighter";

const Jet = () => {
  return (
    <Stage assets={JET_ASSETS}>
      <StarWarp />
      <JetFighter />
    </Stage>
  );
};

export default Jet;
