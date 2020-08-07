/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import type { IGame } from './Core/IGame';
import type { Camera } from './Core/Camera';

export class Game implements IGame {
  private camera: Camera;

  public constructor( camera: Camera ) {
    this.camera = camera;
  }

  public start( aspect: number ): void {
    this.camera.setPitch( aspect );

    console.log( 'Starting game.' );
  }

  public update(): void {
    // console.log( 'Updating game.' );
  }

  public stop(): void {
    console.log( 'Stopping game.' );
  }
}
