import './index.css';

import { StrictMode, } from 'react';
import { createRoot, } from 'react-dom/client';

import App from './App.tsx';

// import App from './App.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     {/* <App /> */}
//     <h1 className='bg-red-500 text-blue-700'>Hola mundo!</h1>
//   </StrictMode>,
// )

function render(): void{
  const rootElement = document.getElementById('root');

  const root = createRoot(rootElement!);
  root.render(
    <StrictMode>
      <App/>
    </StrictMode>
  );
}

render();