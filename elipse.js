import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

var pointer, raycaster;

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

pointer = new THREE.Vector2();
raycaster = new THREE.Raycaster();

const scene = new THREE.Scene();

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

renderer.render(scene, camera);

/* world */

const worldTexture = new THREE.TextureLoader().load("world-map.jpg");
const world = new THREE.Mesh(
    new THREE.SphereGeometry(100, 64, 32),
    new THREE.MeshStandardMaterial({
        map: worldTexture,
        // wireframe: true,
    })
);
scene.add(world);

/* ellipse const */
const ellipseMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });

/* ellipse one*/

const curveOne = new THREE.EllipseCurve(
    50,
    0, // ax, aY
    300,
    150, // xRadius, yRadius
    0,
    2 * Math.PI, // aStartAngle, aEndAngle
    false, // aClockwise
    0 // aRotation
);

/* comet */

const pointsOne = curveOne.getPoints(50);
const geometryOne = new THREE.BufferGeometry().setFromPoints(pointsOne);

// Create the final object to add to the scene
const ellipseOne = new THREE.Line(geometryOne, ellipseMaterial);
ellipseOne.rotation.x = Math.PI * 0.6;
ellipseOne.rotation.y = Math.PI * 0.1;

// scene.add(ellipseOne);
/* ellipse two */

const curveTwo = new THREE.EllipseCurve(
    0,
    0, // ax, aY
    200,
    200, // xRadius, yRadius
    0,
    2 * Math.PI, // aStartAngle, aEndAngle
    false, // aClockwise
    0 // aRotation
);

const pointsTwo = curveTwo.getPoints(50);
const geometryTwo = new THREE.BufferGeometry().setFromPoints(pointsTwo);

// Create the final object to add to the scene
const ellipseTwo = new THREE.Line(geometryTwo, ellipseMaterial);
ellipseTwo.rotation.x = Math.PI * 0.48;
ellipseTwo.rotation.y = Math.PI * 0.05;

scene.add(ellipseTwo);
// console.log( ellipseTwo.geometry.setFromPoints(curve.getPoints(500));

/* comet */

const cometTwo = new THREE.Mesh(
    new THREE.SphereGeometry(10, 10, 5),
    new THREE.MeshStandardMaterial({
        wireframe: true,
    })
);
cometTwo.position.x = 200;
scene.add(cometTwo);

/* ellipse three*/

const curveThree = new THREE.EllipseCurve(
    50,
    0, // ax, aY
    300,
    150, // xRadius, yRadius
    0,
    2 * Math.PI, // aStartAngle, aEndAngle
    false, // aClockwise
    0 // aRotation
);

const pointsThree = curveThree.getPoints(50);
const geometryThree = new THREE.BufferGeometry().setFromPoints(pointsThree);

// Create the final object to add to the scene
const ellipseThree = new THREE.Line(geometryThree, ellipseMaterial);
ellipseThree.rotation.x = Math.PI * 0.6;
ellipseThree.rotation.y = Math.PI * 0.15;

scene.add(ellipseThree);

/* lighting */

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(-500, 500, 1000);
scene.add(pointLight);

/* function */

animate();

function animate() {
    requestAnimationFrame(animate);

    world.rotation.y += -0.001;

    renderer.render(scene, camera);
}
