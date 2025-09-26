#version 300 es

uniform vec4 pos;

in vec4 a_position;
in vec4 a_color;

out vec4 v_color;

void main() {
    gl_Position = a_position + pos;
    v_color = a_color;
}
