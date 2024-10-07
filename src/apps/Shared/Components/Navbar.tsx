import { 
    FC,
    ComponentPropsWithRef,
    ChangeEvent,
    useState,
    useEffect,
    useRef,
} from 'react';

import { useNavigate, } from 'react-router-dom';

// import Button from './Button';
import Button2 from './Button2';
import Menu from './Menu';

import { useAuth } from '../../Auth/mode/AuthUser';
  
type NavbarProps = object & ComponentPropsWithRef<'header'>;
  
const Navbar: FC<NavbarProps> = ({
    ref,
  }) => {
    
    const { token } = useAuth();

    const navigate = useNavigate();
  
    const timeoutRef = useRef<number | null>(null);
  
    const [searchValue, setSearchValue,] = useState<string>('');

    
  
    const handleSearch: (event: ChangeEvent<HTMLInputElement>) => void = (e) => {
      e.preventDefault();
      e.stopPropagation();
  
      const value = e.target.value;
      setSearchValue(value);
    }
  
    useEffect(() => {
      if (!searchValue) {
        navigate({
          pathname: '/',
        });
        return;
      }
  
      timeoutRef.current = setTimeout(() => {
        navigate({
          pathname: 'search',
          search: `?value=${searchValue}`,
        });
      }, 1000);
  
    }, [searchValue,]);
  
    return (
      <header 
        ref={ref}
        className='fixed w-full h-20 bg-white border border-b-gray-200 z-10'>
        <div className='size-full px-4 max-w mx-auto flex items-center justify-between'>
          <a className='text-xl md:text-4xl font-["Teko"]'
          href='/.'
          >Hotel <span className='text-sky-400'>M3</span></a>
          <div className='flex items-center gap-x-2'>
            <input
              type='search'
              className='border sm:w-full border-gray-400 rounded-md py-2 px-6' 
              placeholder='Buscar aqui'
              onChange={handleSearch} />

              {!token ?(
                <Button2
                  onClick={() => navigate('/login')}>
                    Ingreso
                </Button2>
              ) : (
                <Menu></Menu>
              )}
              {!token &&(
                <Button2
                  onClick={() => navigate('/signup')}>
                    Registrate
                </Button2>
              )}
          </div>
        </div>
      </header>
    );
  };
  
  export default Navbar;