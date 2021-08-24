import useAppLoader from "hooks/useAppLoader";

const Playground = ({ assets, children }) => {
  const isLoaded = useAppLoader(assets);

  if (!isLoaded) return null;

  return children;
};

export default Playground;
