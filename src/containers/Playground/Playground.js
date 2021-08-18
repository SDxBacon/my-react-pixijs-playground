import useAppLoader from "hooks/useAppLoader";
import CardFireSprite from "components/CardFireSprite";

const Playground = () => {
  const isLoaded = useAppLoader();

  if (!isLoaded) return null;

  return (
    <>
      <CardFireSprite />
    </>
  );
};

export default Playground;
