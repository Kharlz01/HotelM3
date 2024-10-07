import { 
    FC,
    useRef, 
  } from 'react';
  import { Outlet, } from 'react-router-dom';
  
  import Navbar from './apps/Shared/Components/Navbar';
  
  type RootProps = object;
  
  const Root: FC<RootProps> = () => {
    const navbarRef = useRef<HTMLElement | null>(null);
  
    console.log('navbar ref', navbarRef);
  
    return (
      <div className='relative'>
        <Navbar ref={navbarRef} />
        <main 
          className='relative'
          style={{
            top: `${navbarRef?.current?.clientHeight ?? 80}px`,
          }}>
          <Outlet/>
        </main>
      </div>
    );
  }
  
  export default Root;