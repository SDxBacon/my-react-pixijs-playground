import { TOWN_ASSETS } from "assets_map";
import Stage from "components/Stage";
import Background from "./containers/Background";

const Town = () => {
  return (
    <Stage assets={TOWN_ASSETS}>
      <Background />
    </Stage>
  );
};

export default Town;
