import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Flow } from "three/examples/jsm/modifiers/CurveModifier.js";

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    10000
);
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 0, 1000);
controls.update();

const scene = new THREE.Scene();
renderer.render(scene, camera);

/* world */

const worldTexture = new THREE.TextureLoader().load("./assets/world-map.jpg");
const world = new THREE.Mesh(
    new THREE.SphereGeometry(100, 64, 32),
    new THREE.MeshStandardMaterial({
        map: worldTexture,
        // wireframe: true,
    })
);
scene.add(world);

/* ellipse two */

const curveTwo = new THREE.EllipseCurve(
    0,
    0, // ax, aY
    200,
    200, // xRadius, yRadius
    0,
    2 * Math.PI, // aStartAngle, aEndAngle
    false // aClockwise
    // aRotation
);
curveTwo.closed = true;

// points array

const points = curveTwo.getPoints(100);
const line = new THREE.LineLoop(
    new THREE.BufferGeometry().setFromPoints(points),
    new THREE.LineBasicMaterial({ color: 0x000000 })
);
scene.add(line);

const cometTwo = new THREE.Mesh(
    new THREE.SphereGeometry(10, 10, 5),
    new THREE.MeshStandardMaterial({
        color: 0x000000,
        wireframe: true,
    })
);

const flow = new Flow(cometTwo);
flow.updateCurve(0, curveTwo);
scene.add(flow.object3D);

/* lighting */

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(-500, 500, 1000);
scene.add(pointLight);

/* function */

animate();

function animate() {
    requestAnimationFrame(animate);

    world.rotation.y += -0.001;

    flow.moveAlongCurve(0.0006);

    renderer.render(scene, camera);
}
