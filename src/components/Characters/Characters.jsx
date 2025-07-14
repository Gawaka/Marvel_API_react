import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCharacters, getCharacterByName } from '../../service/MarvelService';
import LoadMessage from '../LoadMessage/LoadMessage';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Button from '../Button/Button';
import './characters.scss';

export default function Characters() {
    const [characters, setCharacters] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    
    useEffect(()=> {
        console.log('useEffect complete');
            if (isSearching) return;

            getAllCharacters(page)
                .then(char=> {
                    setCharacters(prev=>
                        page === 1 ? char : [...prev, ...char]
                    );
                })
                .catch(error=> {
                    setError(true);
                    console.log('Error');
                })
                .finally(()=> {
                    setLoading(false);
                })
    }, [page, isSearching]);

    useEffect(() => {
    if (searchTerm.trim() === '' && page === 1) {
        setIsSearching(false);
        setNoResults(false);
        setPage(1);
    }
}, [searchTerm]);

    function renderCards(arr) {
        const cards = arr.map(item=> (
            <li className="characters__card" key={item.id}>
                <h3 className="characters__name">{item.name}</h3>
                <img
                    className={`characters__thumbnail ${item.thumbnail.includes('image_not_available') ? 'characters__thumbnail--contain' : ''}`}
                    src={item.thumbnail}
                    alt={item.name}
                />
                <div className="characters__buttons-wrapper">
                <Button 
                    className={'characters__btn'} 
                    text='Details' 
                    onClick={() => navigate('/charInfo', { state: { charId: item.id } })}
                />
                    <a href={item.wiki}><Button className={'characters__btn'} text='Wiki' /></a>
                </div>
            </li>
        ));
        return cards
    };

    function loadMoreCharacters() {
        setPage(prev => prev + 1);
    };

    function searchCharacter(e) {
        e.preventDefault();

        if (searchTerm.trim() === '') {
            setIsSearching(false);
            return;
        }

        setLoading(true);
        setIsSearching(true);
        setError(false);
        setNoResults(false);

        getCharacterByName(searchTerm)
            .then(char => {
                if (char.length === 0) {
                    setNoResults(true);
                    setCharacters([]);
                } else {
                    setCharacters(char);
                    setNoResults(false);
                }
            })
            .catch(() => {
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const charCard = !loading && !error ? renderCards(characters) : null;
    const loadMessage = loading ? <LoadMessage className="wrapper-characters-list__loading"/> : null;
    const errorMessage = error ? <ErrorMessage text="Error"/> : null;
    const noResultsMessage = noResults ? <ErrorMessage text="Char is not found"/> : null;
    const loadButton =
        !loading &&
        !error &&
        !isSearching &&
        characters.length > 0 && page < 5 - 1 ? (
            <Button
                className="characters__load-more"
                text="Load More"
                onClick={loadMoreCharacters}
            />
        ) : null;

    return (
        <>
            <section
                className="wrapper-characters-list">
                <div className="wrapper-characters-list__action">
                    <h2 className='title'>Characters</h2>
                    <form 
                        className='wrapper-characters-list__form' 
                        action=""
                        onSubmit={searchCharacter}
                    >
                        <input 
                            className='wrapper-characters-list__search-input' 
                            type="text" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        <button 
                            className='wrapper-characters-list__button'
                            type='submit'
                        >Search</button>
                    </form>
                </div>
                {loadMessage}
                {errorMessage}
                {noResultsMessage}
                <ul className="characters">
                    {charCard}
                </ul>
                {loadButton}
            </section>
        </>
    );
};