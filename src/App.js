import { useIteration } from "./hooks/useIteration";
import { Stage, Sprite } from "@inlet/react-pixi";
import "./App.css";

function App() {
  const i = useIteration(0.1);

  return (
    <div className="App-header">
      <Stage
        width={300}
        height={300}
        raf={false}
        renderOnComponentChange={true}
        options={{ antialias: true, backgroundAlpha: 0 }}
      >
        <Sprite
          anchor={[-(2 + Math.sin(i / 5) * 2), 0.5]}
          position={150}
          rotation={(Math.PI / 180) * 90 + -i}
          image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
        />
      </Stage>
    </div>
  );
}

export default App;
