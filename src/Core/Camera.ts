import { glMatrix as matrix, mat4, vec3 } from 'gl-matrix';

export class Camera {
  private position: vec3;

  private pitch: number;

  private yaw: number;

  public constructor( position?: vec3 ) {
    this.position = position || vec3.create();
    this.pitch = 0;
    this.yaw = 0;
  }

  public getPosition(): vec3 {
    return this.position;
  }

  public getPitch(): number {
    return this.pitch;
  }

  public setPitch( pitch: number ): void {
    this.pitch = pitch;
  }

  public getYaw(): number {
    return this.yaw;
  }

  public setYaw( yaw: number ): void {
    this.yaw = yaw;
  }

  public moveForward( distance: number ): void {
    const rot1Rad = matrix.toRadian( this.yaw );
    this.position[0] -= Math.sin( rot1Rad ) * distance;
    this.position[2] -= Math.cos( rot1Rad ) * distance;
  }

  public moveStrafe( distance: number ): void {
    const rot1Rad = matrix.toRadian( this.yaw );
    this.position[0] -= Math.cos( rot1Rad ) * distance;
    this.position[2] += Math.sin( rot1Rad ) * distance;
  }

  public moveFly( distance: number ): void {
    this.position[1] += distance;
  }

  public modifyModelViewMatrix( modelViewMatrix: mat4 ): void {
    mat4.rotate(
      modelViewMatrix,
      modelViewMatrix,
      matrix.toRadian( -this.pitch ),
      [1, 0, 0],
    );
    mat4.rotate(
      modelViewMatrix,
      modelViewMatrix,
      matrix.toRadian( -this.yaw ),
      [0, 1, 0],
    );
    mat4.translate( modelViewMatrix, modelViewMatrix, [
      -this.position[0],
      -this.position[1],
      -this.position[2],
    ] );
  }
}
