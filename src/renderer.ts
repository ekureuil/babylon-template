// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

import * as BABYLON from 'babylonjs'


// get the canvas DOM element
let canvas = document.getElementById('babylonjs-canvas') as HTMLCanvasElement


// at init resize ? OK
// resizeCanvas()

// window.addEventListener('resize', resizeCanvas, false);

// function resizeCanvas() {
//     canvas.width = window.innerWidth
//     canvas.height = window.innerHeight
// }



// load the 3D engine
var engine = new BABYLON.Engine(canvas, true)

var createScene = function () {
    
        // This creates a basic Babylon Scene object (non-mesh)
        var scene = new BABYLON.Scene(engine);
    
        // This creates and positions a free camera (non-mesh)
        var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    
        // This targets the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());
    
        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);
    
        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    
        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;
    
        // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
        var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
    
        // Move the sphere upward 1/2 its height
        sphere.position.y = 1;
    
        // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
        var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
    
        return scene;
    
    };

let scene = createScene()
// why is the following not working ?
// engine.runRenderLoop( scene.render )
// the typing is correct, but this._interFrameDuration.endMonitoring();
// complains with something like: endMonitoring() is not a prototype of undefined
// meaning that _interFrameDuration is not defined.
// I think this is due to a typical 'this' problem ... or ???
engine.runRenderLoop( () => scene.render() )