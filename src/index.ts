import { Engine } from './Core/Engine';

window.onload = () => {
  const canvas = document.getElementById( 'viewport' ) as HTMLCanvasElement;
  const engine = new Engine( canvas );
  engine.start();
};
