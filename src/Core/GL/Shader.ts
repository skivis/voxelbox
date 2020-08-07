import { createProgramFromSources } from 'twgl.js';

export class Shader {
  private _name: string;

  private _program: WebGLProgram;

  /**
   * Creates a new WebGL shader
   *
   * @param gl WebGL rendering context to use.
   * @param name The name of this shader.
   * @param vs The source of the vertex shader.
   * @param fs The source of the fragment shader.
   */
  public constructor( gl: WebGLRenderingContext, name: string, vs: string, fs: string ) {
    this._name = name;
    this._program = createProgramFromSources( gl, [vs, fs], ( message ) => {
      throw new Error( `Failed to create shader "${this.name}": ${message}` );
    } );
  }

  public get name(): string {
    return this._name;
  }

  public use( gl: WebGLRenderingContext ): void {
    gl.useProgram( this._program );
  }
}
