import { loadShadersFromURLS, setupWebGL, buildProgramFromSources } from '../../libs/utils.js';
import { mat4, vec3, flatten, lookAt, ortho, mult, translate, scalem, rotateX, rotateY, rotateZ} from '../../libs/MV.js';

import * as SPHERE from '../../libs/objects/sphere.js';
import * as CUBE from '../../libs/objects/cube.js';

/** @type {WebGLRenderingContext} */
let gl;

let program;

/** View and Projection matrices */
let mView;
let mProjection;

const edge = 2.0;

let instances = [];
let activeInstance = null;

function computeModelMatrix([px, py, pz, sx, sy, sz, rx, ry, rz]) {
    var rotateM = mult(rotateX(rx), mult(rotateY(ry), rotateZ(rz)));
    return mult(mult(translate(px,py,pz), rotateM), scalem(sx, sy, sz));
}



function render(time) {
    window.requestAnimationFrame(render);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);

    const u_ctm = gl.getUniformLocation(program, "u_ctm");

    instances.forEach(function(instance){
        console.log(instance[0]);
        const mModel = computeModelMatrix(instance[1]);
        gl.uniformMatrix4fv(u_ctm, false, flatten(mult(mProjection, mult(mView, mModel))));
        instance[0].draw(gl, program, gl.LINES);
    })

}



function setup(shaders) {
    const canvas = document.getElementById('gl-canvas');

    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = window.innerHeight;

    gl = setupWebGL(canvas);
    program = buildProgramFromSources(gl, shaders['shader.vert'], shaders['shader.frag']);

    gl.clearColor(0.1, 0.1, 0.1, 1.0);
    gl.viewport(0, 0, canvas.width, canvas.height);

    mView = lookAt(vec3(0, 0, 0), vec3(-1, -1, -2), vec3(0, 1, 0));
    setupProjection();

    SPHERE.init(gl);
    CUBE.init(gl);

    function setupProjection() {
        if (canvas.width < canvas.height) {
            const yLim = edge * canvas.height / canvas.width;
            mProjection = ortho(-edge, edge, -yLim, yLim, -10, 10);
        }
        else {
            const xLim = edge * canvas.width / canvas.height;
            mProjection = ortho(-xLim, xLim, -edge, edge, -10, 10);
        }

    }
    window.addEventListener("resize", function () {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = window.innerHeight;

        setupProjection();

        gl.viewport(0, 0, canvas.width, canvas.height);
    });

    const instance_list = document.getElementById("object_instances")
    const inputIds = ["px","py","pz","sx","sy","sz","rx","ry","rz"];
    const transformInputs = inputIds.map(id => document.getElementById(id));

    transformInputs.forEach((input, index) => {
        input.addEventListener("input", () => {
            if (activeInstance < 0) return;
            instances[activeInstance][1][index] = parseFloat(input.value);
        });
    });

    instance_list.addEventListener("change", function(){
        activeInstance = instance_list.selectedIndex;
        transformInputs.forEach((input, index) => {
            input.value = instances[activeInstance][1][index];
        });
    })

    document.getElementById("add_cube").onclick = function(){
        instances.push([CUBE, [0,0.05,0,1,1,1,1,0,0]]);
        instance_list.add(new Option("Cube"));
    }

    document.getElementById("add_sphere").onclick = function(){
        instances.push([SPHERE, [0,0.05,0,1,1,1,1,0,0]]);
        instance_list.add(new Option("Sphere"));
    }
    
    document.getElementById("remove_button").onclick = function(){
        instances.splice(activeInstance, 1);
        instance_list.remove(activeInstance);
    }


    window.requestAnimationFrame(render);
}

const shaderUrls = ['shader.vert', 'shader.frag'];

loadShadersFromURLS(shaderUrls).then(shaders => setup(shaders));
