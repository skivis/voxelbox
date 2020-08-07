/* eslint-disable class-methods-use-this */
import { getWebGLContext, resizeCanvasToDisplaySize } from 'twgl.js';
import { FS_SOURCE, VS_SOURCE } from './GL/shaders';
import { Shader } from './GL/Shader';

export class Renderer {
  private readonly _internal: WebGLRenderingContext;

  private readonly _canvas: HTMLCanvasElement;

  private shader!: Shader;

  private buffer!: WebGLBuffer;

  public constructor( canvas: HTMLCanvasElement ) {
    this._canvas = canvas;
    this._internal = getWebGLContext( canvas );

    this.initialize();
  }

  public get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  public get gl(): WebGLRenderingContext {
    return this._internal;
  }

  public initialize(): void {
    this.resize();
    this.clear();

    this.shader = new Shader( this.gl, 'basic', VS_SOURCE, FS_SOURCE );
    this.shader.use( this.gl );

    this.buffer = this.createBuffer( this.gl );
  }

  public resize(): void {
    resizeCanvasToDisplaySize( this.canvas );
    this._internal.viewport( 0, 0, this.canvas.width, this.canvas.height );
  }

  private clear() {
    this._internal.clearColor( 0.4, 0.7, 1.0, 1.0 );
    this._internal.clearDepth( 1.0 );
    this._internal.enable( this._internal.DEPTH_TEST );
    this._internal.depthFunc( this._internal.LEQUAL );
  }

  private createBuffer( gl: WebGLRenderingContext ): WebGLBuffer {
    const buffer = gl.createBuffer();

    if ( !buffer ) {
      throw new Error( 'Failed to create buffer, probably due to an error earlier in the pipeline.' );
    }

    const vertices = [
      // 0.0, 0.0, 0.0,
      // 0.0, 0.5, 0.0,
      // 0.5, 0.5, 0.0,

      0.0, 0.5, 0.0,
      -0.5, -0.5, 0.0,
      0.5, -0.5, 0.0,
    ];

    gl.bindBuffer( gl.ARRAY_BUFFER, buffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );

    gl.bindBuffer( gl.ARRAY_BUFFER, null );
    gl.disableVertexAttribArray( 0 );

    return buffer;
  }

  public drawScene( gl: WebGLRenderingContext ): void {
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    gl.bindBuffer( gl.ARRAY_BUFFER, this.buffer );
    gl.vertexAttribPointer( 0, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( 0 );

    gl.drawArrays( gl.TRIANGLES, 0, 3 );
  }

  public render(): void {
    this.drawScene( this._internal );
  }
}
