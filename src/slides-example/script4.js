'use strict';
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería informática
 * Programación de Aplicaciones Interactivas
 * 
 * @author Jorge González Delgado
 * @since 05-05-22
 * @desc Example web program script
 */

/**
 * Main function of the example.
 */
function main() {
  const canvas = document.querySelector("#glCanvas");
  // Initialize the GL context
  const gl = canvas.getContext("webgl");

  // Only continue if WebGL is available and working
  if (gl === null) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }

  const vsSource = `
    attribute vec4 aVertexPosition;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    }
  `;

  const fsSource = `
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
  `;
}

/**
 * Shader initialization function.
 * @param {WebGLRenderingContext} gl - WebGL context.
 * @param {String} vsSource - Vertex shader source.
 * @param {String} fsSource - Fragment shader source.
 * @return {WebGLProgram} - WebGL program.
 */
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}
