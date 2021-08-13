import useSpriteSheet from "./useSpriteSheet";

const spritesheet =
  "https://pixijs.io/examples/examples/assets/spritesheet/fighter.json";

const useJetFighter = () => {
  const textures = useSpriteSheet(spritesheet);

  return textures;
};

export default useJetFighter;
