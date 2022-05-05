/**
* Functions with Fragment Shader
*/
precision highp float;

uniform vec2 u_zoomCenter;
uniform float u_zoomSize;
uniform int u_maxIterations;

/** Mandelbrot iterations */
vec2 f(vec2 zComplexNumber, vec2 cComplexNumber) {
  return mat2(zComplexNumber,-zComplexNumber.y,zComplexNumber.x)*zComplexNumber + cComplexNumber;
}

/** COLORS */
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
    return a + b * cos( 6.28318 * (c * t + d) );
} 

void main() {
  vec2 uv = gl_FragCoord.xy / vec2(800.0, 800.0);
  vec2 cComplexNumber = u_zoomCenter + (uv * 4.0 - vec2(2.0)) * (u_zoomSize / 4.0);
  vec2 zComplexNumber = vec2(0.0);
  bool escaped = false;
  int iterations = 0;    
  for (int i = 0; i < 10000; i++) {
    if (i > u_maxIterations) break;
    iterations = i;
    cComplexNumber = f(cComplexNumber, zComplexNumber);
    if (length(cComplexNumber) > 2.0) {
      escaped = true;
      break;
    }
  }
  gl_FragColor = escaped ? vec4(palette(float(iterations)/float(u_maxIterations), vec3(0.0),vec3(0.59,0.55,0.75),vec3(0.1, 0.2, 0.3),vec3(0.75)),1.0) : vec4(vec3(0.85, 0.99, 1.0), 1.0);
}