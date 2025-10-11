import { loadShadersFromURLS, setupWebGL, buildProgramFromSources } from "../../libs/utils.js";
import { vec2, vec4, flatten } from "../../libs/MV.js";

// Global variables declaration

/** @type {WebGL2RenderingContext} */
var gl;
/** @type {WebGLProgram} */
var program;
/** @type {WebGLVertexArrayObject} */
var vao;

const NUM = 120000;

function hsv2rgb(h, s, v) {
    let c = v * s;
    let hp = h * 6.0;
    let x = c * (1 - Math.abs((hp % 2) - 1));

    let r = 0, g = 0, b = 0;
    if (0 <= hp && hp < 1) [r,g,b] = [c,x,0];
    else if (1 <= hp && hp < 2) [r,g,b] = [x,c,0];
    else if (2 <= hp && hp < 3) [r,g,b] = [0,c,x];
    else if (3 <= hp && hp < 4) [r,g,b] = [0,x,c];
    else if (4 <= hp && hp < 5) [r,g,b] = [x,0,c];
    else if (5 <= hp && hp < 6) [r,g,b] = [c,0,x];

    let m = v - c;
    return [r+m, g+m, b+m, 1.0];
}



function setup(shaders) {
    // Setup
    /** @type {HTMLElement} */
    const canvas = document.getElementById("gl-canvas");

    gl = setupWebGL(canvas);

    program = buildProgramFromSources(gl, shaders["shader.vert"], shaders["shader.frag"]);

    vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    const vertices = [];

    for (var i = 0; i < NUM; i++) {
        const color = hsv2rgb( 2*i / NUM, 1.0, 1.0 );
        vertices.push(i, -1.0, color[0], color[1], color[2], color[3]);
        vertices.push(i, +1.0, color[0], color[1], color[2], color[3]);
    }

    const aBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, aBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
    
    const a_index = gl.getAttribLocation(program, "a_index");
    gl.vertexAttribPointer(a_index, 1, gl.FLOAT, false, 6*4, 0);
    gl.enableVertexAttribArray(a_index);

    const a_side = gl.getAttribLocation(program, "a_side");
    gl.vertexAttribPointer(a_side, 1, gl.FLOAT, false, 6*4, 1*4);
    gl.enableVertexAttribArray(a_side);
    
    const a_color = gl.getAttribLocation(program, "a_color");
    gl.vertexAttribPointer(a_color, 4, gl.FLOAT, false, 6*4, 2*4);
    gl.enableVertexAttribArray(a_color);

    gl.bindVertexArray(null);

    gl.viewport(0, 0, canvas.width, canvas.height);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.useProgram(program);
    const u_aspect_ratio = gl.getUniformLocation(program, "u_aspect_ratio");
    gl.uniform1f(u_aspect_ratio, gl.canvas.width/gl.canvas.height);
    const u_v_count = gl.getUniformLocation(program, "u_v_count");
    gl.uniform1f(u_v_count, NUM/2);
    const u_thickness = gl.getUniformLocation(program, "u_thickness");
    gl.uniform1f(u_thickness, 0.0075);
    const u_family = gl.getUniformLocation(program, "u_family");
    gl.uniform1f(u_family, 6.0);

    window.requestAnimationFrame(animate);
}

function animate(time) {
    window.requestAnimationFrame(animate)

    gl.clear(gl.COLOR_BUFFER_BIT);

    const a_coefficient = gl.getUniformLocation(program, "a_coefficient");
    gl.uniform1f(a_coefficient, (Math.sin(time*0.00002)*4.5+5.5));
    const b_coefficient = gl.getUniformLocation(program, "b_coefficient");
    gl.uniform1f(b_coefficient, (Math.sin(time*0.00004)*4.5+5.5));
    const c_coefficient = gl.getUniformLocation(program, "c_coefficient");
    gl.uniform1f(c_coefficient, 5.37);
    const u_t_max = gl.getUniformLocation(program, "u_t_max");
    gl.uniform1f(u_t_max, 32.08);

    gl.bindVertexArray(vao);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, NUM);

    gl.bindVertexArray(null);
}

loadShadersFromURLS(["shader.vert", "shader.frag"]).then(shaders => setup(shaders));
