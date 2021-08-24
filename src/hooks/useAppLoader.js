import { useState, useEffect } from "react";
import each from "lodash/each";
import { useApp } from "@inlet/react-pixi";

const useAppLoader = (assets) => {
  const app = useApp();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      each(assets, (o) => {
        app.loader.add(o.key, o.url);
      });

      app.loader.load(() => {
        setIsLoaded(true);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoaded;
};

export default useAppLoader;
