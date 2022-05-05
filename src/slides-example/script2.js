'use strict';
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería informática
 * Programación de Aplicaciones Interactivas
 * 
 * @author Jorge González Delgado
 * @since 05-05-22
 * @desc Main function of the example web program script
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
}