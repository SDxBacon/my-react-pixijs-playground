import useAppLoader from "hooks/useAppLoader";

const Playground = ({ children }) => {
  const isLoaded = useAppLoader();

  if (!isLoaded) return null;

  return children;
};

export default Playground;
