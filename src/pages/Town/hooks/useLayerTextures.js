import inRange from "lodash/inRange";
import { Rectangle } from "pixi.js";
import { useApp } from "@inlet/react-pixi";
import MAPJson from "pages/Town/constants/map";

const findTilesetsIndex = (tile) => {
  return MAPJson.tilesets.findIndex((tileset) => {
    const start = tileset.firstgid;
    const end = start + tileset.tilecount;
    return inRange(tile, start, end);
  });
};

const useLayerTextures = (layerData) => {
  const app = useApp();

  return layerData.data.map((tile, index) => {
    /** tile 為 0 代表透明的 */
    if (tile === 0) {
      return { texture: null };
    }

    /** 先把對應的tileset撈出來 */
    const tilesetIndex = findTilesetsIndex(tile);
    const tilesetRef = MAPJson.tilesets[tilesetIndex];

    const indexInTileset = tile - tilesetRef.firstgid;

    /** clone texture */
    const texture = app.loader.resources[tilesetRef.name].texture.clone();

    const rectX = (indexInTileset % tilesetRef.columns) * tilesetRef.tilewidth;
    const rectY =
      Math.floor(indexInTileset / tilesetRef.columns) * tilesetRef.tilewidth;

    /** setup display rectangle area */
    const rect = new Rectangle(
      rectX,
      rectY,
      MAPJson.tilewidth,
      MAPJson.tileheight
    );
    texture.frame = rect;

    /** return */
    return {
      x: (index % layerData.width) * MAPJson.tilewidth,
      y: Math.floor(index / layerData.width) * MAPJson.tileheight,
      texture,
    };
  });
};

export default useLayerTextures;
