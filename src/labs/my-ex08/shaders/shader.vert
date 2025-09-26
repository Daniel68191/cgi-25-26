#version 300 es

uniform vec4 pos;

in vec4 a_position;

void main() {
    gl_Position = a_position + pos;
}
