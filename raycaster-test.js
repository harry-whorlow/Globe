import "./style.css";
import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

var pointer, raycaster;

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

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

camera.position.set(0, 0, 1000);
controls.update();

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

/* ///// comet one ///// */

/* base */
const cometOneBase = new THREE.Object3D();
cometOneBase.rotation.x = Math.PI / 0.55;

const cometTwoBase = new THREE.Object3D();
cometTwoBase.rotation.x = Math.PI / 0.55;

/* comet */

const cometOne = new THREE.Mesh(
    new THREE.SphereGeometry(10, 24, 12),
    new THREE.MeshStandardMaterial({
        color: 0xffffff,
        wireframe: true,
    })
);
cometOne.position.x = 200;
cometOneBase.add(cometOne);
cometOne.hoverValue = false;
console.log(cometOne);
/* comet Ring */

const cometOneRing = new THREE.Mesh(
    new THREE.RingGeometry(200, 200, 60, 60),
    new THREE.MeshStandardMaterial({
        wireframe: true,
    })
);
cometOneRing.rotation.x = -0.5 * Math.PI;

cometOneBase.add(cometOneRing);

scene.add(cometOneBase);

/* comet two */

const cometTwo = new THREE.Mesh(
    new THREE.SphereGeometry(10, 24, 12),
    new THREE.MeshStandardMaterial({
        color: 0x000000,
        wireframe: true,
    })
);
cometTwo.position.x = 200;
cometTwoBase.add(cometTwo);
cometTwo.hoverValue = false;

/* comet Ring two */

const cometTwoRing = new THREE.Mesh(
    new THREE.RingGeometry(200, 200, 60, 60),
    new THREE.MeshStandardMaterial({
        wireframe: true,
    })
);

cometTwoBase.add(cometTwoRing);

scene.add(cometTwoBase);

/* lighting */

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(-500, 500, 1000);
scene.add(pointLight);

/* function */

window.addEventListener("pointermove", onPointerMove);
console.log("onload", scene.children);

animate();

function animate() {
    requestAnimationFrame(animate);

    hoverElement();

    world.rotation.y += -0.001;

    if (cometOne.hoverValue === false) {
        cometOneBase.rotation.y += -0.003;
    }

    if (cometTwo.hoverValue === false) {
        cometTwoBase.rotation.z += -0.006;
    }

    renderer.render(scene, camera);
}

function hoverElement() {
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        console.log(intersects);
        for (let i = 0; i < intersects.length; i++) {
            intersects[i].object.hoverValue = true;
        }
    } else {
        const check = scene.children.forEach((element) => {
            element.children
                .filter((child) => child.hasOwnProperty("hoverValue"))
                .forEach((comet) => {
                    comet.hoverValue = false;
                });
        });
    }
}

function onPointerMove(event) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

//  scene.children.children.filter((child) => child.children.length > 1);
