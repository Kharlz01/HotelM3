import { 
    useState,
    FC, 
    PropsWithChildren,
    MouseEvent,
  } from 'react';
  
  type ButtonProps = object & PropsWithChildren & {
    onClick?: (e: MouseEvent) => void;
    disabled?: boolean;
    loading?: boolean;
  }
  
  const Button2: FC<ButtonProps> = ({
    children,
    onClick,
    disabled = false,
    loading = false,
  }) => {
    const [hover, setHover,] = useState<boolean>(false);
  
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`py-2 px-4 rounded-lg ${hover ? 'bg-sky-500' : 'bg-sky-300'}`}
        style={{
          ...(disabled && {
            backgroundColor: 'gray',
          }),
        }}>
          <span className='text-lg leading-4'>
            {loading && (
              'Cargando...'
            )}
            {!loading && children}
          </span>
      </button>
    );
  };
  
  export default Button2;