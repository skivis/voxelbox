import type { IGame } from './Core/IGame';
import type { Camera } from './Core/Camera';

export class Game implements IGame {
  private readonly camera: Camera;

  public constructor( camera: Camera ) {
    this.camera = camera;
  }

  public start( aspect: number ): void {
    this.camera.setPitch( aspect );

    console.log( 'Game started.' );
  }

  // eslint-disable-next-line class-methods-use-this
  public update(): void {
    console.log( 'Game state updated.' );
  }
}
