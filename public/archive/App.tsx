import {
    ChangeEvent,
    FC,
    useRef,
    // useEffect,
    useState,
} from 'react';

import Test from './Test';

type AppProps = object;

const App: FC<AppProps> = () => {
    const subtitleRef = useRef<HTMLHeadingElement | null>(null);

    const [counter, setCounter,] = useState<number>(0);
    const [increment, setIncrement] = useState<number>(1);
    // const [fontSize, setFontSize,] = useState<number>(16);

    const handleDecrementar: () => void = () => {
        setCounter(counter - increment);
        handleChangeFontsize(counter);
    }
    
    const handleIncrementar: () => void = () => {
        setCounter(counter + increment);
        handleChangeFontsize(counter);
    }

    const handleReset: () => void = () =>{
        setCounter(0);
        handleChangeFontsize(16);
    }

    const handleInputIncrement: (event: ChangeEvent<HTMLInputElement>) => void = (e) => {
        e.preventDefault();
        e.stopPropagation();

        console.log('Evento = ',e);
        

        const value = +e.target.value;
        if (typeof value !== 'number'){
            console.log('El valor no es numerico.');
            return;
        }

        setIncrement(value);
    }

    // Un useEffect solo se ejecuta una unica vez si no tiene
    // parametros de dependencias.

    // useEffect(() => {
    //     console.log('Ejecutando UseEffect');
    //     const handleKeyDown: (event: KeyboardEvent) => void = (e) => {
    //         console.log('Presionando tecla: ', e.key);
    //         // if (e.key == '+') return handleIncrementar();
    //         // if (e.key == '-') return handleDecrementar();
    //     }
    //     document.addEventListener('keydown', handleKeyDown);
    // },[]);

    // Un useEffect se ejecuta varias veces si tiene parametros
    // cambiantes en el array de dependencias.
    
    // useEffect(() => {
    //     console.log('Ejecutando UseEffect con parametros');
    // },[counter,])
    
    const handleChangeFontsize: (fontSize: number) => void = (fontSize) => subtitleRef.current!.style.fontSize = `${fontSize}px`;

    return(
        <div className='p-6'>
            <h1>Hola Mundo!</h1>
            <div className='flex flex-col gap-y-2'>
                <h2 
                    ref={subtitleRef}>
                    Este subtitulo esta referenciado
                </h2>
                {/* <div className='flex items-center gap-x-4'>
                    <button
                    onClick={() => handleChangeFontsize('-')}>-</button>
                    <button
                    onClick={() => handleChangeFontsize('+')}>+</button>
                </div> */}
            </div>
 
            <div className='flex flex-col gap-y-4'>
                <input 
                type="number"
                placeholder='Incremento de contador'
                value={increment}
                onChange={handleInputIncrement} />
                <span>Contador: {counter}</span>
            </div>
            <div className='flex items-center mt-4 gap-x-4 mb-6'>
                <button className='bg-red-500'
                onClick={() => handleDecrementar()}>
                    - Decrementar
                </button>
                <button className='bg-yellow-200'
                onClick={() => handleReset()}>
                    Reset
                </button>
                <button className='bg-green-500'
                onClick={() => handleIncrementar()}>
                    + Incrementar
                </button>
            </div>
            {/* {counter > 5 && (
                <Test/>
            )} */}
            <Test/>
        </div>
    )
}

export default App;