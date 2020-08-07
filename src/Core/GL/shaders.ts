export const VS_SOURCE = `
  attribute vec3 a_position;

  void main() {
    gl_Position = vec4(a_position, 1.0);
  }
`;

export const FS_SOURCE = `
  precision mediump float;

  void main() {
    gl_FragColor = vec4(1.0);
  }
`;
