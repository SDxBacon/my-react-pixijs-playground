import { useState, useEffect } from "react";
import { Stage } from "@inlet/react-pixi";
import JetFighter from "./components/JetFighter";
import "./App.css";

const App = () => {
  const [size, setSize] = useState({
    width: 700,
    height: 700,
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
        // raf={false}
        renderOnComponentChange={true}
        options={{ antialias: true, backgroundAlpha: 1 }}
      >
        <JetFighter />
      </Stage>
    </div>
  );
};

export default App;
