function animate() {
    requestAnimationFrame(animate);

    world.rotation.y += -0.001;

    cometOneBase.rotation.y += -0.003;

    renderer.render(scene, camera);
}

function onPointerMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    console.log("check");
}

export { onPointerMove };
