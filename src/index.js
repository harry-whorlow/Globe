import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var pointer, raycaster;
pointer = new THREE.Vector2();
raycaster = new THREE.Raycaster();
pointer.x = 1;
pointer.y = 1;

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
camera.position.set(0, 400, 1000);
controls.update();
renderer.render(scene, camera);

window.addEventListener("pointermove", onPointerMove);

/* lighting */

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(-500, 500, 1000);
scene.add(pointLight);

//
//
// main
//
//

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

/* ellipse const */
const ellipseMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });

/* ellipse two */

const curveTwo = new THREE.EllipseCurve(
    0,
    0, // ax, aY
    150,
    150, // xRadius, yRadius
    0,
    2 * Math.PI, // aStartAngle, aEndAngle
    false, // aClockwise
    0 // aRotation
);

const pointsTwo = curveTwo.getPoints(100);
const geometryTwo = new THREE.BufferGeometry().setFromPoints(pointsTwo);

// Create the final object to add to the scene
const ellipseTwo = new THREE.Line(geometryTwo, ellipseMaterial);
ellipseTwo.rotation.x = Math.PI * 0.5;
ellipseTwo.rotation.z = Math.PI * 1.5;
ellipseTwo.rotation.y = Math.PI * 0.05;

scene.add(ellipseTwo);

/* comet */

const cometTwo = new THREE.Mesh(
    new THREE.SphereGeometry(10, 10, 5),
    new THREE.MeshStandardMaterial({
        wireframe: true,
    })
);

scene.add(cometTwo);

/* ellipse three */

const curveThree = new THREE.EllipseCurve(
    50,
    0, // ax, aY
    250,
    150, // xRadius, yRadius
    0,
    2 * Math.PI, // aStartAngle, aEndAngle
    false, // aClockwise
    0 // aRotation
);

const pointsThree = curveThree.getPoints(100);
const geometryThree = new THREE.BufferGeometry().setFromPoints(pointsThree);

// Create the final object to add to the scene
const ellipseThree = new THREE.Line(geometryThree, ellipseMaterial);
ellipseThree.rotation.x = Math.PI * 0.6;
ellipseThree.rotation.y = Math.PI * 0.15;

scene.add(ellipseThree);

/* comet */

const cometThree = new THREE.Mesh(
    new THREE.SphereGeometry(10, 10, 5),
    new THREE.MeshStandardMaterial({
        wireframe: true,
    })
);
cometThree.position.x = 200;

scene.add(cometThree);

/* clock */
let clock = new THREE.Clock();
let v = new THREE.Vector3();
let w = new THREE.Vector3();

/* function */
console.log("scene children", scene.children);

animate();

function animate() {
    requestAnimationFrame(animate);
    let s = (clock.getElapsedTime() * 0.08) % 1;
    let t = (clock.getElapsedTime() * 0.05) % 1;

    curveTwo.getPointAt(s, v);
    cometTwo.position.copy(v);
    cometTwo.position.applyMatrix4(ellipseTwo.matrixWorld);

    curveThree.getPointAt(t, w);
    cometThree.position.copy(w);
    cometThree.position.applyMatrix4(ellipseThree.matrixWorld);

    hoverElement();

    world.rotation.y += -0.001;

    renderer.render(scene, camera);
}

function onPointerMove(event) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function hoverElement() {
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        console.log("current intersects", intersects);
    }
}
