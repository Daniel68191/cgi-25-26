#version 300 es

in float a_index;
in float a_side;
in vec4 a_color;

uniform float u_t_max;
uniform float u_v_count;
uniform float a_coefficient;
uniform float b_coefficient;
uniform float c_coefficient;
uniform float u_thickness;
uniform float u_family;

uniform float u_aspect_ratio;

out vec4 v_color;

const float E = 2.718281828459045;


float compute_t() {
    return (a_index * u_t_max) / u_v_count;
}

vec2 compute_family_1(float t) {
    float x = cos(a_coefficient * t) + cos(b_coefficient * t)/2.0 + sin(c_coefficient * t)/3.0;
    float y = sin(a_coefficient * t) + sin(b_coefficient * t)/2.0 + cos(c_coefficient * t)/3.0;
    return vec2(x, y);
}

vec2 compute_family_2(float t) {
    float x = 2.0*(cos(a_coefficient * t) + pow(cos(b_coefficient * t),3.0));
    float y = 2.0*(sin(a_coefficient * t) + pow(sin(b_coefficient * t),3.0));
    return vec2(x, y);
}

vec2 compute_family_3(float t) {
    float x = cos(a_coefficient * t) * sin(sin(a_coefficient * t));
    float y = sin(a_coefficient * t) * cos(cos(a_coefficient * t));
    return vec2(x, y);
}

vec2 compute_family_4(float t) {
    float x = cos(a_coefficient * t) * cos(b_coefficient * t);
    float y = sin(cos(a_coefficient * t));
    return vec2(x, y);
}

vec2 compute_family_5(float t) {
    float x = sin(a_coefficient * t) * (pow(E, cos(a_coefficient * t)) - 2.0*cos(b_coefficient * t));
    float y = cos(a_coefficient * t) * (pow(E, cos(a_coefficient * t)) - 2.0*cos(b_coefficient * t));
    return vec2(x, y);
}

vec2 compute_family_6(float t) {
    float x = (a_coefficient - b_coefficient) * cos(b_coefficient * t) + cos(a_coefficient * t - b_coefficient * t);
    float y = (a_coefficient - b_coefficient) * sin(b_coefficient * t) - sin(a_coefficient * t - b_coefficient * t);
    return vec2(x, y);
}

vec2 compute_position(float t) {
    vec2 pos;
    if (u_family <= 1.0) {
        pos = compute_family_1(t);
    } else if (u_family <= 2.0) {
        pos = compute_family_2(t);
    } else if (u_family <= 3.0) {
        pos = compute_family_3(t);
    } else if (u_family <= 4.0) {
        pos = compute_family_4(t);
    } else if (u_family <= 5.0) {
        pos = compute_family_5(t);
    } else {
        pos = compute_family_6(t);
    }
    return vec2(pos.x/u_aspect_ratio, pos.y);
}

void main() {
    float t = compute_t();
    vec2 pos = compute_position(t);

    float dt = u_t_max / u_v_count;
    vec2 pos_next = compute_position(t + dt);
    vec2 tangent = normalize(pos_next - pos);
    vec2 normal = vec2(-tangent.y, tangent.x);

    pos += normal * (a_side * u_thickness);
    gl_Position = vec4(pos, 0.0, 2.0);

    v_color = a_color;
}