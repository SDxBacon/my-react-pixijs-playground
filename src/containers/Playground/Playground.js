import useAppLoader from "hooks/useAppLoader";
import Town from "components/Town";
import CardFireSprite from "components/CardFireSprite";

const Playground = () => {
  const isLoaded = useAppLoader();

  if (!isLoaded) return null;

  return (
    <>
      <Town />
      {/* <CardFireSprite /> */}
    </>
  );
};

export default Playground;
