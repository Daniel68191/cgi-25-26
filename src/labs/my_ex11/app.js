import { loadShadersFromURLS, setupWebGL, buildProgramFromSources } from "../../libs/utils.js";
import { vec2, vec4, flatten } from "../../libs/MV.js";

// Global variables declaration

/** @type {WebGL2RenderingContext} */
var gl;
/** @type {WebGLProgram} */
var program;
/** @type {WebGLVertexArrayObject} */
var vao;

const NUM = 100;

function setup(shaders) {
    // Setup

    // Get the canvas element in the web page
    /** @type {HTMLElement} */
    const canvas = document.getElementById("gl-canvas");

    // Create the WebGL2 Rendering Context
    gl = setupWebGL(canvas);

    // Create the GLSL program from the shader sources (vertex + fragment)
    program = buildProgramFromSources(gl, shaders["shader.vert"], shaders["shader.frag"]);

    vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    const vertices = [];

    for (var i = 0; i < NUM; i++) {
        var angle = i * Math.PI / 20;
        vertices.push([0.8 * Math.cos(angle), 0.8 * Math.sin(angle), 2*Math.random()-1, 2*Math.random()-1, Math.random() + 0.25, Math.random() + 0.25, Math.random() + 0.25, 1.0]);
    }

    const aBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, aBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
    const first_position = gl.getAttribLocation(program, "first_position");
    gl.vertexAttribPointer(first_position, 2, gl.FLOAT, false, 8*4, 0);
    gl.enableVertexAttribArray(first_position);
    const last_position = gl.getAttribLocation(program, "last_position");
    gl.vertexAttribPointer(last_position, 2, gl.FLOAT, false, 8*4, 2*4);
    gl.enableVertexAttribArray(last_position);
    const a_color = gl.getAttribLocation(program, "a_color");
    gl.vertexAttribPointer(a_color, 4, gl.FLOAT, false, 8*4, 4*4);
    gl.enableVertexAttribArray(a_color);

    // By now the vertex array has all the information to be used later
    // during rendering
    gl.bindVertexArray(null);

    // Setup the viewport
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Setup the background color
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // Call animate for the first time
    window.requestAnimationFrame(animate);
}

function animate(time) {
    // Trigger another call for the next frame update
    window.requestAnimationFrame(animate)

    // Drawing code
    // Clear the framebuffer with the background color
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Use the WebGL program created before
    gl.useProgram(program);

    const u_time = gl.getUniformLocation(program, "u_time");
    gl.uniform1f(u_time, Math.abs(Math.sin(0.0005*time)));
    // Make the vertex array object active (records how to fetch vertex data
    // from buffer)
    gl.bindVertexArray(vao);

    // Draw triangles using 3 vertices (one triangle)
    gl.drawArrays(gl.LINE_LOOP, 0, 40);

    // Deactivate the vertex array object since drawing is complete
    gl.bindVertexArray(null);
}

loadShadersFromURLS(["shader.vert", "shader.frag"]).then(shaders => setup(shaders));
