import { useState, useEffect } from "react";
import { Stage } from "@inlet/react-pixi";
import Playground from "../Playground";

const CommonStageComp = ({ children }) => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function reportWindowSize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    reportWindowSize();
    window.addEventListener("resize", reportWindowSize);

    return () => window.removeEventListener("resize", reportWindowSize);
  }, []);

  return (
    <Stage
      {...size}
      renderOnComponentChange={true}
      options={{
        antialias: true,
      }}
    >
      <Playground>{children}</Playground>
    </Stage>
  );
};

export default CommonStageComp;
