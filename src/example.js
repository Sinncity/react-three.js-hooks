import {
  Scene,
  Color,
  Mesh,
  MeshNormalMaterial,
  BoxBufferGeometry,
  PerspectiveCamera,
  WebGLRenderer
} from "three";

import Stats from "stats.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class Example {
  constructor(node) {
    this.node = node;
  }

  init = () => {
    this.width = this.node.current.clientWidth;
    this.height = this.node.current.clientHeight;
    this.aspect = this.width / this.height;
    this.camera = new PerspectiveCamera(50, this.aspect, 1, 1000);
    this.camera.position.z = 700;

    this.controls = new OrbitControls(this.camera);

    this.geometry = new BoxBufferGeometry(200, 200, 200);
    this.material = new MeshNormalMaterial();
    this.mesh = new Mesh(this.geometry, this.material);

    this.scene = new Scene();
    this.scene.background = new Color("#191919");
    this.scene.add(this.mesh);

    this.renderer = new WebGLRenderer({
      powerPreference: "high-performance",
      antialias: true
    });

    this.node.current.appendChild(this.renderer.domElement);
    window.addEventListener("resize", this.onWindowResize);

    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.render(this.scene, this.camera);
    this.renderer.setAnimationLoop(this.animate);
  };

  animate = () => {
    this.stats.begin();

    this.mesh.rotation.x += 0.005;
    this.mesh.rotation.y += 0.001;

    this.controls.update();
    this.renderer.render(this.scene, this.camera);

    this.stats.end();
  };

  cleanup = () => {
    window.removeEventListener("resize", this.onWindowResize);
    this.renderer.setAnimationLoop(null);
  };

  onWindowResize = () => {
    this.width = this.node.current.clientWidth;
    this.height = this.node.current.clientHeight;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
  };
}

export default Example;
