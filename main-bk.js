import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
    alpha: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(100);
camera.position.setY(20);

renderer.render(scene, camera);

/* world */

const worldTexture = new THREE.TextureLoader().load("world-map.jpg");
const world = new THREE.Mesh(
    new THREE.SphereGeometry(16, 64, 32),
    new THREE.MeshStandardMaterial({
        map: worldTexture,
        // wireframe: true,
    })
);
scene.add(world);

/* ///// comet one ///// */

/* base */
const cometOneBase = new THREE.Object3D();

cometOneBase.rotation.x = Math.PI / 1.1;

/* comet */

const cometOne = new THREE.Mesh(
    new THREE.SphereGeometry(1, 10, 5),
    new THREE.MeshStandardMaterial({
        wireframe: true,
    })
);
cometOne.position.x = 40;
cometOneBase.add(cometOne);

/* comet Ring */

const cometOneRing = new THREE.Mesh(
    new THREE.RingGeometry(40, 40, 60, 60),
    new THREE.MeshStandardMaterial({
        wireframe: true,
    })
);
cometOneRing.rotation.x = -0.5 * Math.PI;

cometOneBase.add(cometOneRing);

const cometOneRings = new THREE.Mesh(
    new THREE.RingGeometry(40, 40, 60, 60),
    new THREE.MeshStandardMaterial({
        wireframe: true,
    })
);

cometOneBase.add(cometOneRings);

scene.add(cometOneBase);

/* lighting */

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(-50, 50, 100);
scene.add(pointLight);

function animate() {
    requestAnimationFrame(animate);

    world.rotation.y += -0.001;

    cometOneBase.rotation.y += -0.003;

    renderer.render(scene, camera);
}

animate();
