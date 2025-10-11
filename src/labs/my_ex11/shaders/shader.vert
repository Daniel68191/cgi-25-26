#version 300 es

in vec4 first_position;
in vec4 last_position;
in vec4 a_color;

uniform float u_time;

out vec4 v_color;

void main() {
    gl_Position = mix(first_position, last_position, u_time);
    v_color = a_color;
}
