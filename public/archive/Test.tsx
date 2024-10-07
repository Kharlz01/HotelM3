import { 
    ChangeEvent,
    FC,
    useEffect,
    useRef,
    useCallback,
    useState,
 } from "react";

interface Character {
    name: string;
}

 type TestProps = object;

 const Test: FC<TestProps> = () =>{
    const timeoutRef = useRef<number | null>(null);

    const [searchValue, setSearchValue,] = useState<string>('');
    const [characters, setCharacters,] = useState<Array<Character>>([]);
    const [loading, setLoading,] = useState<boolean>(false);
    
    const handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        
    }

    const findAllCharactersBySearch: () => Promise<Array<Character>> = useCallback (async () => {
        if (!searchValue) return;
        
        const url = import.meta.env.VITE_API_URL;

        const endpoint = `${url}/character?name=${searchValue}`;
        const request = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const response = await request.json();
        return response.results ?? [] as Array<Character>;
    }, [searchValue,]);

    useEffect(() => {
        let isSubscribed = true;

        if (isSubscribed) {
            setLoading(true);
            timeoutRef.current = setTimeout(() => {
                findAllCharactersBySearch()
                    .then(setCharacters)
                    .catch(err => console.error(err))
                    .finally(() => setLoading(false));
            }, 500);
        }

        return () => {
            isSubscribed = false;
            if (timeoutRef.current)
                clearTimeout(timeoutRef.current);
        }

    }, [findAllCharactersBySearch,]);

    return (
        <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-x-2">
                <input type="search"
                placeholder="Buscar aqui..." 
                value={searchValue}
                onChange={handleInputChange}/>

                <span>Resultados de la busqueda: {characters?.length ?? 0} </span>
            </div>
            {loading && (<p>Loading.</p>)}
            {characters && characters?.length > 0 &&(
                <ul className="flex flex-col gap-y-1">
                    {characters.map(character => (
                        <li key={character.name}>
                            {character.name}
                        </li>
                    ))};
                </ul>
            )}
            {characters?.length <= 0 && (
                <p>No hay personajes</p>
            )}
        </div>
    );
 }

 export default Test;