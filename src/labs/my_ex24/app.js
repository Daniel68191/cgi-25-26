import { buildProgramFromSources, loadShadersFromURLS, setupWebGL } from '../../libs/utils.js';
import { length, flatten, inverse, mult, normalMatrix, perspective, lookAt, vec4, vec3, vec2, subtract, add, scale, rotate, normalize, dot } from '../../libs/MV.js';

import * as dat from '../../libs/dat.gui.module.js';

import * as CUBE from '../../libs/objects/cube.js';
import * as SPHERE from '../../libs/objects/sphere.js';

import * as STACK from '../../libs/stack.js';

function setup(shaders) {
    const canvas = document.getElementById('gl-canvas');
    const gl = setupWebGL(canvas);

    CUBE.init(gl);
    SPHERE.init(gl);

    const program = buildProgramFromSources(gl, shaders['shader.vert'], shaders['shader.frag']);

    // Camera  
    let camera = {
        eye: vec3(0, 0, 5),
        at: vec3(0, 0, 0),
        up: vec3(0, 1, 0),
        fovy: 45,
        aspect: 1, // Updated further down
        near: 0.1,
        far: 20
    }

    let options = {
        wireframe: false,
        normals: true
    }

    const gui = new dat.GUI();

    const optionsGui = gui.addFolder("options");
    optionsGui.add(options, "wireframe");
    optionsGui.add(options, "normals");

    const cameraGui = gui.addFolder("camera");
    cameraGui.add(camera, "fovy").min(0.1).max(120).step(0.1).listen();

    cameraGui.add(camera, "aspect").min(0.1).max(120).step(0.1).listen().domElement.style.pointerEvents = "none";
    cameraGui.add(camera, "near").min(0.1).max(120).step(0.1).listen().onChange(v => {
        camera.near = Math.min(v, camera.far-0.1);
    });
    cameraGui.add(camera, "far").min(0.1).max(120).step(0.1).listen().onChange(v => {
        camera.far = Math.max(v, camera.near+0.1);
    });

    const eye = cameraGui.addFolder("eye");
    eye.add(camera.eye, "0");
    eye.add(camera.eye, "1");
    eye.add(camera.eye, "2");

    const at = cameraGui.addFolder("at");
    at.add(camera.at, "0");
    at.add(camera.at, "1");
    at.add(camera.at, "2");
    
    const up = cameraGui.addFolder("up");
    up.add(camera.up, "0");
    up.add(camera.up, "1");
    up.add(camera.up, "2");

    document.onwheel = function (event) {
        switch (event.type) {
            case "wheel":
                if (event.ctrlKey || event.shiftKey) {
                    let dir = scale(0.25, normalize(subtract(camera.at,camera.eye)));
                    if (event.deltaY < 0) {
                        if (dot(dir, scale(0.25,normalize(subtract(camera.at, add(camera.eye, dir))))) == 1) {
                            camera.eye = add(camera.eye, dir);
                        } else if (dot(dir, subtract(camera.at, subtract(camera.eye, dir))) == 1) {
                            camera.eye = subtract(camera.eye, dir);
                        }
                        console.log(dot(dir, subtract(camera.at, add(camera.eye, dir))));
                    }
                    console.log(camera.eye);
                } else if (event.altKey) {
                    let dir = scale(0.25,normalize(subtract(camera.at,camera.eye)));
                    console.log(dir);
                    if (event.deltaY < 0) {
                        camera.eye = add(camera.eye, dir);
                        camera.at = add(camera.at, dir);
                    } else {
                        camera.eye = subtract(camera.eye, dir);
                        camera.at = subtract(camera.eye, dir);
                    }
                } else {
                    (event.deltaY < 0) ? camera.fovy -= 5 : camera.fovy += 5;
                    camera.fovy = Math.min(120, Math.max(0.1, camera.fovy));
                    break;
                }
        }
    }


    // matrices
    let mView, mProjection;

    let down = false;
    let lastX, lastY;

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    resizeCanvasToFullWindow();

    window.addEventListener('resize', resizeCanvasToFullWindow);


    window.requestAnimationFrame(render);

    function resizeCanvasToFullWindow() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        camera.aspect = canvas.width / canvas.height;

        gl.viewport(0, 0, canvas.width, canvas.height);
    }

    function render(time) {
        window.requestAnimationFrame(render);

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.useProgram(program);

        mView = lookAt(camera.eye, camera.at, camera.up);
        STACK.loadMatrix(mView);

        mProjection = perspective(camera.fovy, camera.aspect, camera.near, camera.far);


        gl.uniformMatrix4fv(gl.getUniformLocation(program, "u_model_view"), false, flatten(STACK.modelView()));
        gl.uniformMatrix4fv(gl.getUniformLocation(program, "u_projection"), false, flatten(mProjection));
        gl.uniformMatrix4fv(gl.getUniformLocation(program, "u_normals"), false, flatten(normalMatrix(STACK.modelView())));

        gl.uniform1i(gl.getUniformLocation(program, "u_use_normals"), options.normals);

        SPHERE.draw(gl, program, options.wireframe ? gl.LINES : gl.TRIANGLES);
        CUBE.draw(gl, program, gl.LINES);
    }
}

const urls = ['shader.vert', 'shader.frag'];

loadShadersFromURLS(urls).then(shaders => setup(shaders));