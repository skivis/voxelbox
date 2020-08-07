// eslint-disable-next-line import/no-mutable-exports
export let gl: WebGLRenderingContext;

export class GLUtilities {
  public static initialize( canvas: HTMLCanvasElement ): HTMLCanvasElement {
    gl = canvas.getContext( 'webgl' );
    if ( gl === undefined ) {
      throw new Error( 'No WebGL support, sorry!' );
    }

    return canvas;
  }
}
