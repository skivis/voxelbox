import Stats from 'stats.js';
import { Renderer } from './Renderer';
import { Game } from '../Game';
import { InputManager } from './InputManager';
import { Camera } from './Camera';

export class Engine {
  private readonly renderer: Renderer;

  private readonly game: Game;

  private readonly stats: Stats;

  private readonly viewport: HTMLCanvasElement;

  private readonly camera: Camera;

  // public constructor( canvas: HTMLCanvasElement, options?: EngineOptions | undefined ) {
  public constructor( canvas: HTMLCanvasElement ) {
    this.viewport = canvas;
    this.renderer = new Renderer( canvas );
    this.camera = new Camera();
    this.game = new Game( this.camera );
    this.stats = new Stats();

    document.body.appendChild( this.stats.dom );
  }

  /**
   * Starts the main game loop
   */
  public start(): void {
    InputManager.initialize( this.viewport );
    this.game.start( 0 );
    this.gameLoop();
  }

  /**
   * The main game loop
   */
  private gameLoop = (): void => {
    const callback = () => {
      this.game.update();
      this.renderer.render();
      this.stats.update();

      requestAnimationFrame( callback );
    };

    requestAnimationFrame( callback );
  }
}
