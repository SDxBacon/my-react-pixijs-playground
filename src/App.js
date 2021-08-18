import { useState, useEffect } from "react";
import { Stage } from "@inlet/react-pixi";
import Playground from "containers/Playground";
import "./App.css";

const App = () => {
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
    <div className="App-header">
      <Stage
        {...size}
        renderOnComponentChange={true}
        options={{
          antialias: true,
        }}
      >
        <Playground />
      </Stage>
    </div>
  );
};

export default App;
