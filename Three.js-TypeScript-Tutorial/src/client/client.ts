// 3차 GUI 패널추가
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 통계표 패널 출력
import Stats from 'three/examples/jsm/libs/stats.module'
// GUI 패널 추가
import { GUI } from 'dat.gui'
const scene = new THREE.Scene()

// 축도우미 추가
scene.add(new THREE.AxesHelper(5))

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 2

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.addEventListener('change', render)

const geometry = new THREE.BoxGeometry()
const geometry2 = new THREE.TorusKnotGeometry()

const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
})

const cube = new THREE.Mesh(geometry, material)
cube.scale.x = 1
cube.scale.y = 1
cube.scale.z = 1

scene.add(cube)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    //render()
}

const stats = new Stats()
document.body.appendChild(stats.dom)

const gui = new GUI()
const cubeFolder = gui.addFolder('Cube');
const cuveRotationFolder = cubeFolder.addFolder('Rotation');
cuveRotationFolder.add(cube.rotation, "x", 0, Math.PI * 2)
cuveRotationFolder.add(cube.rotation, "y", 0, Math.PI * 2)
cuveRotationFolder.add(cube.rotation, "z", 0, Math.PI * 2)
// 열어두고싶을때 사용
cubeFolder.open()
cuveRotationFolder.open()
const cuvePositionFolder = cubeFolder.addFolder('Position');
// -10 부터 5만큼 0.1씩 움직인다 0.1을 설정안한다면 1씩 움직임
cuvePositionFolder.add(cube.position, "x", -10, 5, 0.1)
cuvePositionFolder.add(cube.position, "y", -10, 5, 0.1)
cuvePositionFolder.add(cube.position, "z", -10, 5, 0.1)
// 열어두고싶을때 사용
cuvePositionFolder.open()
const cuveScaleFolder = cubeFolder.addFolder('Scale');
cuveScaleFolder.add(cube.scale, "x", 0, 5)
cuveScaleFolder.add(cube.scale, "y", 0, 5)
cuveScaleFolder.add(cube.scale, "z", 0, 5)
// 보였다 안보였다하게하는 기능
cubeFolder.add(cube, 'visible')
// 열어두고싶을때 사용
cuveScaleFolder.open()

function animate() {
    requestAnimationFrame(animate)

    // cube.rotation.x += 0.01
    // cube.rotation.y += 0.01

    render()

    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()
//render()