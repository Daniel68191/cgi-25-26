import { buildProgramFromSources, loadShadersFromURLS, setupWebGL } from '../../libs/utils.js';
import { length, flatten, inverse, mult, normalMatrix, perspective, lookAt, vec4, vec3, vec2, subtract, add, scale, rotate, normalize } from '../../libs/MV.js';

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

    let UI = {
        options: { folder: true, target: options },
        fovy:    { target: camera, prop: "fovy", min: 0.1, max: 120},
        aspect:  { target: camera, prop: "aspect" },
        near:    { target: camera, prop: "near" },
        far:     { target: camera, prop: "far" },
        eye:     { folder: true, target: camera.eye },
        at:      { folder: true, target: camera.at },
        up:      { folder: true, target: camera.up }
    };

    const gui = new dat.GUI();

    function addNumericPropsToFolder(folder, obj) {
        Object.keys(obj).forEach(k => {
            if (typeof obj[k] === "number") folder.add(obj, k);
        });
    }

    function buildFromDescriptor(gui, descriptor) {
        Object.keys(descriptor).forEach(key => {
            const desc = descriptor[key];

            if (!desc) {return};
            if (desc.folder) {
            const sub = gui.addFolder(key);
            if (desc.target && typeof desc.target === "object") {
                addNumericPropsToFolder(sub, desc.target);
            } else if (desc.children) {
                buildFromDescriptor(sub, desc.children);
            }
            } else if (desc && desc.target && desc.prop) {
            gui.add(desc.target, desc.prop);
            } else if (desc && desc.target) {
            addNumericPropsToFolder(gui, desc.target);
            } else {
            if (camera[key] !== undefined && typeof camera[key] === "number") {
                gui.add(camera, key);
            } else {
                console.warn("Unsupported UI descriptor for key:", key, desc);
            }
            }
        });
    }

    // Build the GUI
    buildFromDescriptor(gui, UI);
    


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

        mProjection = perspective(45, camera.aspect, 0.01, 20);


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