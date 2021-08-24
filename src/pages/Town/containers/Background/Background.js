import { useApp, Container } from "@inlet/react-pixi";
import Layer from "../../components/Layer";
import MAPJson from "pages/Town/constants/map";

const Background = () => {
  const app = useApp();

  const mapWidth = MAPJson.width * MAPJson.tilewidth;
  const mapHeight = MAPJson.height * MAPJson.tileheight;

  const containerWidth = mapWidth;
  const containerHeight = mapHeight;

  return (
    <Container
      // TODO: center the container
      x={(app.renderer.view.width - containerWidth) / 2}
      y={(app.renderer.view.height - containerHeight) / 2}
      width={containerWidth}
      height={containerHeight}
    >
      {MAPJson.layers.map((layer) => {
        return <Layer layerData={layer} key={layer.name} />;
      })}
    </Container>
  );
};

export default Background;
