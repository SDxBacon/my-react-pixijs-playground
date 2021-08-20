import { useRef, useEffect } from "react";
import * as PIXI3D from "pixi3d";
import throttle from "lodash/throttle";
import { useApp, useTick } from "@inlet/react-pixi";

const DEBUG = throttle((msg) => console.log(msg), 300);

const JetFighter = () => {
  const app = useApp();
  const cameraRef = useRef();

  useEffect(() => {
    const resources = app.loader.resources;
    const model = PIXI3D.Model.from(resources.starConflict.gltf);
    // model.height = 10;
    // model.width = 10;
    model.position.set(10, 20);
    model.scale.set(0.2);

    let dirLight = Object.assign(new PIXI3D.Light(), {
      type: "directional",
      intensity: 0.5,
      x: -4,
      y: 7,
      z: -4,
    });
    dirLight.rotationQuaternion.setEulerAngles(45, 45, 0);
    PIXI3D.LightingEnvironment.main.lights.push(dirLight);

    let pointLight = Object.assign(new PIXI3D.Light(), {
      type: "point",
      x: -1,
      y: 0,
      z: 3,
      range: 10,
      intensity: 10,
    });
    PIXI3D.LightingEnvironment.main.lights.push(pointLight);

    cameraRef.current = new PIXI3D.CameraOrbitControl(app.view);

    app.stage.addChild(model);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useTick(() => {
    DEBUG(cameraRef.current);
  });

  return null;
};

export default JetFighter;
