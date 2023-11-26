import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OrthographicCamera } from './../../node_modules/@types/three/src/cameras/OrthographicCamera.d';
import { Scene } from './../../node_modules/@types/three/src/scenes/Scene.d';

const scene = new THREE.Scene()
const scene2 = new THREE.Scene()
// background color값 설정
scene.background = new THREE.Color(0xffffff)
scene2.background = new THREE.Color(0x2f2f2f)


const camera1 = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
const camera2 = new THREE.OrthographicCamera(-1,1,1,-1,.1,10)
const camera3 = new THREE.OrthographicCamera(-1,1,1,-1,.1,10)
const camera4 = new THREE.OrthographicCamera(-1,1,1,-1,.1,10)
camera1.position.z = 2
camera2.position.y = 1
camera2.lookAt(new THREE.Vector3(0, 0, 0))
camera3.position.z = 1
camera4.position.x = 1
camera4.lookAt(new THREE.Vector3(0, 0, 0))

const canvas1 = document.getElementById('c1') as HTMLCanvasElement
const canvas2 = document.getElementById('c2') as HTMLCanvasElement
const canvas3 = document.getElementById('c3') as HTMLCanvasElement
const canvas4 = document.getElementById('c4') as HTMLCanvasElement
const renderer1 = new THREE.WebGLRenderer({ canvas: canvas1 })
renderer1.setSize(200, 200)
const renderer2 = new THREE.WebGLRenderer({ canvas: canvas2 })
renderer2.setSize(200, 200)
const renderer3 = new THREE.WebGLRenderer({ canvas: canvas3 })
renderer3.setSize(200, 200)
const renderer4 = new THREE.WebGLRenderer({ canvas: canvas4 })
renderer4.setSize(200, 200)

// document.body.appendChild(renderer1.domElement)

// 마우스를 이용하여 도형을 돌리거나 휠로 다가갈수 있음
new OrbitControls(camera1, renderer1.domElement)
// animation Loop
// 해당 이미지에 변화가 생겼을때 render2()함수를 실행함 
const controls = new OrbitControls(camera3, renderer3.domElement)
controls.addEventListener('change',render2)

// 일반 박스형
const geometry = new THREE.BoxGeometry()
// 입체형
const geometry2 = new THREE.TorusGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
})

const cube = new THREE.Mesh(geometry, material)
scene.add(cube)
const cube2 = new THREE.Mesh(geometry2, material)
cube2.scale.x = 0.5
cube2.scale.y = 0.5
cube2.scale.z = 0.5
scene2.add(cube2)

// window.addEventListener('resize', onWindowResize, false)
// function onWindowResize() {
//     camera1.aspect = window.innerWidth / window.innerHeight
//     camera1.updateProjectionMatrix()
//     renderer1.setSize(window.innerWidth, window.innerHeight)
//     render()
// }

function animate() {
    requestAnimationFrame(animate)

    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    cube2.rotation.x += 0.001
    cube2.rotation.y += 0.001
    render()
}

function render() {
    renderer1.render(scene, camera1)
    renderer3.render(scene2, camera3)
}

function render2() {
    renderer2.render(scene, camera2)
    renderer4.render(scene2, camera4)
}

animate()
// animation Loop
render2()
