//! main
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
import { OutlineEffect } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/effects/OutlineEffect.js';



//Ł global variables, constants
let nodes = [];
let selectedSoma = -1;
let selectedAxonInd = -1;
let draggingInd = -1;
let isMousePressed = false;
let activeBtn=null;
let neurons_ns = 0;
let ClickPosOnGrid = {x:0,y:0};
const cellSize = 49;
//*buttons
const body=document.querySelector("body");
const spawnToolBtn=document.querySelector("#spawnToolBtn");
const connToolBtn=document.querySelector("#connToolBtn");
const cutToolBtn=document.querySelector("#cutToolBtn");
const removeToolBtn=document.querySelector("#removeToolBtn");

//Ł renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild(renderer.domElement);

//Ł scene
const scene = new THREE.Scene();
//Ł background color
scene.background = new THREE.Color(0x444488);
//Ł field of view
scene.fog = new THREE.Fog("green", 10, 50);

//Ł camera
const camera = new THREE.PerspectiveCamera(
    45,                                     /*field of view*/
    window.innerWidth / window.innerHeight, /*aspect ratio*/
    0.1,                                    /*near clipping*/
    1000                                    /*far clipping*/
);
//Ł camera position
camera.position.set(0, 15, 10);
camera.rotation.x = -1;
//Ł camera controls
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.mouseButtons = { LEFT: 0, MIDDLE: 1, RIGHT: null } //0orbit 1zoom 2pan
orbit.keys = {
    LEFT: 'ArrowLeft', //left arrow
    UP: null, // up arrow
    RIGHT: null, // right arrow
    BOTTOM: 'ArrowDown' // down arrow
}
orbit.minDistance = 10;
orbit.maxDistance = 50;
orbit.maxPolarAngle = Math.PI / 3;
orbit.enableDamping = true;

//Ł mouse actions
const mousePosition = new THREE.Vector2();      /*noramiled values*/
const raycaster = new THREE.Raycaster();        /*create a raycaster class instance, then set the two ends of the ray in the animate function*/
let mousePos = { x: 0, y: 0 };
let intersectingElements = null;
window.addEventListener("mousemove", (e) => {      /*catch the pisition of the cursor,then update the vector*/
    mousePos.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePos.y = -(e.clientY / window.innerHeight) * 2 + 1;


    raycaster.setFromCamera(mousePos, camera);   /*endpoints of raycaster*/
    intersectingElements = raycaster.intersectObjects(scene.children);
    console.log(intersectingElements);

    intersectingElements.forEach(intersect => {
        if (intersect.object.name === "ground") {
            if (activeBtn == "spawnTool") {
                const highlightPos = new THREE.Vector3().copy(intersect.point).floor().addScalar(0.5);
                highlightMesh.position.set(highlightPos.x, 0.001, highlightPos.z);
            }
            else if(activeBtn==null) {
                const spherePos = new THREE.Vector3().copy(intersect.point).floor().addScalar(0.5);
                dragged.position.set(spherePos.x, 0.15, spherePos.z);
            }
        }
    });
});
//*click
window.addEventListener("click", () => {
    if (activeBtn == null) {
        intersectingElements.forEach(intersect => {
            if (intersect.object.name === "sphere") {
                selectedSoma = intersect.object;
            }
        });
    }
    else if (activeBtn == spawnToolBtn) {
        intersectingElements.forEach(intersect => {
            if (intersect.object.name === "ground") {
                const sphereClone = sphereMesh.clone();
                sphereClone.position.copy(highlightMesh.position);
                sphereClone.position.setY(0.15);
                sphereClone.name = "sphere"
                scene.add(sphereClone);
                spheres.push(sphereClone);
            }
        });
    }
    else if (activeBtn == cutToolBtn) {
        //cut axon
    }
    else if (activeBtn == removeToolBtn) {
        intersectingElements.forEach(intersect => {
            if (intersect.object.name === "sphere") {
                scene.remove(intersect.object);
            }
        });
    }
});

//Ł resize
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

//Ł elements  
//*plane
const planeMesh = new THREE.Mesh(          /*mesh=geometry+material*/
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshBasicMaterial({ color: "lightgray", side: THREE.DoubleSide, visible: true })
);
planeMesh.rotateX(-Math.PI / 2);
planeMesh.name = "ground";

//*grid
// const grid= new THREE.GridHelper(100,100);

//*highlight
const highlightMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({ side: THREE.DoubleSide })
);
highlightMesh.rotateX(-Math.PI / 2);
highlightMesh.position.set(0.5, -1, 0.5);

//*sphere
//geometry
const radius = 0.25;
const sphereGeometry = new THREE.SphereGeometry(radius, 32, 16);
//material
const beta = 0;
const diffuseColor = new THREE.Color().setHSL(0.2, 1, 0.1).multiplyScalar(1 - beta * 0.2);

const colors = new Uint8Array(6);
for (let c = 0; c <= colors.length; c++) {
    colors[c] = (c / colors.length) * 256;
}
const gradientMap = new THREE.DataTexture(colors, colors.length, 1, THREE.LuminanceFormat);

const sphereMaterial = new THREE.MeshToonMaterial({
    color: diffuseColor,
    gradientMap: gradientMap,
    fog: true,
});
//mesh
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphereMesh.position.setY(0.15);
const spheres = [sphereMesh];

//*effects
const effect = new OutlineEffect(renderer);

//*light
const ambientLight = new THREE.AmbientLight(0x888888);
const pointLight = new THREE.PointLight(0xffffff, 2, 800);
const particleLight = new THREE.Mesh(
    new THREE.SphereGeometry(1, 10, 10),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
);
particleLight.add(pointLight);
particleLight.translateY(200);

scene.add(planeMesh);
// scene.add(grid);
scene.add(highlightMesh);
scene.add(sphereMesh);
scene.add(ambientLight);
scene.add(particleLight)

//Ł animation
// orbit.update();                          
renderer.setAnimationLoop(animate);

//Ł button events
spawnToolBtn.addEventListener("click", (event) => {
    spawnToolBtn.classList.toggle("active");
    if (activeBtn == spawnToolBtn) {
        activeBtn = null;
        return;
    }
    else if (activeBtn ===null) {
        activeBtn = spawnToolBtn;
        return;
    }
    else if (activeBtn != spawnToolBtn) {
        if (activeBtn !==null) {
            activeBtn.click();
            activeBtn = spawnToolBtn;
            return;
        }
    }
});
connToolBtn.addEventListener("click", () => {
    connToolBtn.classList.toggle("active");
    if (activeBtn == connToolBtn) {
        activeBtn = null;
    }
    else if (activeBtn ===null) {
        activeBtn = connToolBtn;
        return;
    }
    else if (activeBtn != connToolBtn) {
        if (activeBtn !==null) {
            activeBtn.click();
            activeBtn = connToolBtn;
            return;
        }
    }
});
cutToolBtn.addEventListener("click", () => {
    cutToolBtn.classList.toggle("active");
    if (activeBtn == cutToolBtn) {
        activeBtn = null;
    }
    else if (activeBtn ===null) {
        activeBtn = cutToolBtn;
        return;
    }
    else if (activeBtn != cutToolBtn) {
        if (activeBtn !==null) {
            activeBtn.click();
            activeBtn = cutToolBtn;
            return;
        }
    }
});
removeToolBtn.addEventListener("click", () => {
    removeToolBtn.classList.toggle("active");
    if (activeBtn == removeToolBtn) {
        activeBtn = null;
    }
    else if (activeBtn ===null) {
        activeBtn = removeToolBtn;
        return;
    }
    else if (activeBtn != removeToolBtn) {
        if (activeBtn !==null) {
            activeBtn.click();
            activeBtn = removeToolBtn;
            return;
        }
    }
});

//! functions
const sphereId = sphereMesh.id;

function animate() {
    orbit.update();     /*Update the controls. Must be called after any manual changes to the camera's transform*/
    renderer.render(scene, camera);
    effect.render(scene, camera);
}