// import confetti from 'canvas-confetti';
import { Engine } from './Core/Engine';

window.onload = () => {
  const canvas = document.getElementById( 'viewport' ) as HTMLCanvasElement;
  const engine = new Engine( canvas );
  engine.start();
};

// confetti.create( document.getElementById( 'viewport' ) as HTMLCanvasElement, {
//   resize: true,
//   useWorker: true,
// } )( { particleCount: 200, spread: 200 } );
