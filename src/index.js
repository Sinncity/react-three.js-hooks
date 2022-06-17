import React, { useEffect, useRef } from "react";
import { render } from "react-dom";
import WebGLExample from "./example";

const App = () => {
  const canvas = useRef(null);

  useEffect(() => {
    const webGLExample = new WebGLExample(canvas);
    webGLExample.init();

    return () => {
      webGLExample.cleanup();
    };
  }, []);

  return <div style={{ width: "100%", height: "100%" }} ref={canvas} />;
};

render(<App />, document.getElementById("root"));
