import { loadShadersFromURLS, setupWebGL, buildProgramFromSources } from "../../libs/utils.js";
import { vec2, vec4, flatten } from "../../libs/MV.js";

// Global variables declaration

/** @type {WebGL2RenderingContext} */
var gl;
/** @type {WebGLProgram} */
var program;
/** @type {WebGLVertexArrayObject} */
var vao;

var connector;
var pos;

var velocityX = Math.random() * 2 - 1;
var velocityY = Math.random() * 2 - 1;
var positionX = 0;
var positionY = 0;

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

    // Triangle vertices
    const positions = [vec2(-0.25, -0.25), vec2(0.25, -0.25), vec2(-0.25, 0.25), vec2(0.25, 0.25)];
    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(positions), gl.STATIC_DRAW);
    const a_position = gl.getAttribLocation(program, "a_position");
    gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_position);

    const colors = [vec4(1.0, .0, .0, 1.0), vec4(.0, 1.0, .0, 1.0), vec4(.0, .0, 1.0, 1.0), vec4(1.0, 1.0, .0, 1.0)];
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);
    const a_color= gl.getAttribLocation(program, "a_color");
    gl.vertexAttribPointer(a_color, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_color);

    // By now the vertex array has all the information to be used later
    // during rendering
    gl.bindVertexArray(null);

    // Setup the viewport
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Setup the background color
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    pos = gl.getUniformLocation(program, "pos");

    // Call animate for the first time
    window.requestAnimationFrame(animate);
}

function animate() {
    // Trigger another call for the next frame update
    window.requestAnimationFrame(animate)

    if (positionX >= 0.75 || positionX <= -0.75) velocityX = -velocityX;
    if (positionY >= 0.75 || positionY <= -0.75) velocityY = -velocityY;
    
    positionX += velocityX * 0.0065;
    positionY += velocityY * 0.0065;

    // Drawing code

    // Clear the framebuffer with the background color
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Use the WebGL program created before
    gl.useProgram(program);

    // Make the vertex array object active (records how to fetch vertex data
    // from buffer)
    gl.bindVertexArray(vao);

    gl.uniform4f(pos, positionX, positionY, 0.0, 0.0);

    // Draw triangles using 3 vertices (one triangle)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    // Deactivate the vertex array object since drawing is complete
    gl.bindVertexArray(null);
}

loadShadersFromURLS(["shader.vert", "shader.frag"]).then(shaders => setup(shaders));
