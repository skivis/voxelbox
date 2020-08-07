export class InputManager {
  private static viewport: HTMLCanvasElement;

  public static initialize( viewport: HTMLCanvasElement ): void {
    InputManager.viewport = viewport;
  }
}
