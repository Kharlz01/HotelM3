import {
    FC,
} from 'react';

import { RouterProvider, } from 'react-router-dom';

// Elemento autenticador de la token
import { AuthProvider } from './apps/Auth/mode/AuthUser';

import router from './Router';


type AppProps = object;
  
const App: FC<AppProps> = () => {
  return (
    <AuthProvider>
      <RouterProvider
        router={router}/>
    </AuthProvider>
  );
}

export default App;