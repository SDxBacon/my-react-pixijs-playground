import { Sprite } from "@inlet/react-pixi";
import useLayerTextures from "pages/Town/hooks/useLayerTextures";

const Layer = ({ layerData }) => {
  const result = useLayerTextures(layerData);

  return result.map((props, index) => {
    const { texture } = props;

    if (!texture) return null;

    return (
      <Sprite key={`tile-${index}`} alpha={layerData.opacity} {...props} />
    );
  });
};

export default Layer;
