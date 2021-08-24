import { useRef, useEffect } from "react";
import clamp from "lodash/clamp";
import { useImmer } from "use-immer";
import { useApp, useTick } from "@inlet/react-pixi";
import { MIN_VELOCITY, MAX_VELOCITY, calcVelocity } from "utils";

const DEFAULT_CONFIG = {
  x: 0, // position x
  vx: MIN_VELOCITY, // velocity of x
};

// app.renderer.view.width 和app.renderer.view.height

const useJetFighterMotion = (containerRef) => {
  const app = useApp(); // PIXI.Application
  const xPosRef = useRef(0); // 飛機參考 x 點
  const xTargetRef = useRef(0); // 目標滑鼠 x 位置
  const isDragging = useRef(false); // flag, 是否正在拖曳
  const [config, updateConfig] = useImmer({
    ...DEFAULT_CONFIG,
    // x: app.renderer.view.width / 2,
    x: 0,
  });

  const onDragStart = (evt) => {
    if (isDragging.current) return;
    // enable isDragging flag
    isDragging.current = true;

    // memorize x position reference
    xPosRef.current = evt.data.global.x;
  };

  const onDragEnd = () => {
    if (!isDragging.current) return;
    // disable isDragging flag
    isDragging.current = false;
    // DEBUG: reset position x
    updateConfig((draft) => {
      draft.x = 0;
      draft.vx = 0;
    });
  };

  const onDragMove = (evt) => {
    if (!isDragging.current) return;

    xTargetRef.current = evt.data.global.x;
  };

  useTick(() => {
    if (!isDragging.current) return null;

    const currX = config.x;
    const currVX = config.vx;
    let nextX = currX;
    let nextVX = currVX;

    if (xTargetRef.current > config.x) {
      /**
       * 飛機目前位置在滑鼠左側
       */
      // calculate next velocity
      const control = clamp(currVX / MAX_VELOCITY, 0.01, 1);
      nextVX = calcVelocity(MIN_VELOCITY, MAX_VELOCITY, control);
      nextX += nextVX;
    } else if (xTargetRef.current < config.x) {
      /**
       * 飛機目前位置在滑鼠右側
       */
      // calculate next velocity
    } else {
      /**
       * 飛機目前位置與滑鼠位置相同
       */
      xPosRef.current = xTargetRef.current;
      // reduce velocity to zero
    }

    updateConfig((draft) => {
      console.log(`next X: ${nextX}, next VX: ${nextVX}`);
      draft.x = nextX;
      draft.vx = nextVX;
    });
  });

  useEffect(() => {
    const container = containerRef.current;
    container
      .on("pointerdown", onDragStart)
      .on("pointerup", onDragEnd)
      .on("pointerupoutside", onDragEnd)
      .on("pointermove", onDragMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return config;
};

export default useJetFighterMotion;
