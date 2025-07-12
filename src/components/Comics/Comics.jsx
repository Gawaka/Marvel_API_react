import { useEffect, useState } from 'react';
import { getAllComics, getComicsByName } from '../../service/MarvelService';
import LoadMessage from '../LoadMessage/LoadMessage';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Button from '../Button/Button';
import './comics.scss';

export default function Comics() {
    const [comics, setComics] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);    
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(()=> {
        setLoading(true);
        setError(false);
        getAllComics(page)
            .then(comics=> {
                console.log('useEffect comics is worked');
                setComics(prev=> 
                    page === 1 ? comics : [...prev, ...comics]
                );
            })
            .catch(error=> {
                setError(true)
                setLoading(false)
            })
            .finally(()=> {
                setLoading(false)
                setError(false)
            })
    }, [page, isSearching]);

    useEffect(()=> {
        if (searchTerm.trim() === `` && page === 1) {
            setIsSearching(false);
            setNoResults(false);
            setPage(1);
        }
    }, [searchTerm]);

    function searchComics(e) {
        e.preventDefault();
            console.log('Search term:', searchTerm);
        const inc = searchTerm.trim();
        const low = inc.toLocaleLowerCase();

        if (searchTerm.trim() === '') {
            setIsSearching(false);
            return;
        }

        setLoading(true);
        setIsSearching(true);
        setError(false);
        setNoResults(false);

        getComicsByName(searchTerm)
            .then(comics=> {
                if(comics.length === 0) {
                    setNoResults(true);
                    setComics([]);
                } else {
                    setComics(comics);
                    setNoResults(false);
                }
            })
            .catch(error=> {
                setError(true);
            })
            .finally(()=> {
                setLoading(false);
            });
    };

    function loadMoreComics() {
        setPage(prev => prev + 1);
    };

    function renderComicsCards() {
        const cards = comics.map(item=> (
            <li className='comics__card' key={item.id}>
                <h3 className='comics__name'>{item.title}</h3>
                <img className='comics__thumbnail' src={item.thumbnail} alt={item.name} />
                <p className="comics__description">{item.description}</p>
                <div className="comics__info">
                    <p className="comics__price">price: {item.price}$</p>
                    <p className="comics__pages">pages: {item.pages}</p>
                    <p className="comics__language">{item.language}</p>
                </div>
            </li>
        ));
        return cards
    };

    const comicsCard = renderComicsCards();
    const loadMessage = loading ? <LoadMessage className='wrapper-comics-list__loading'/> : null;
    const errorMessage = error ? <ErrorMessage text="Error"/> : null;
    const loadButton = 
        !loading && 
        !error &&
        comics.length > 0 && page < 5 - 1 ? (
            <Button 
                text="Load more" 
                className='wrapper-comics-list__load-more'
                onClick={loadMoreComics}
                />
        ) : null;

    return(
        <>
            <section className="wrapper-comics-list">
                <div className="wrapper-comics-list__action">
                    <h2 className='wrapper-comics-list__title'>Comics</h2>
                    <form 
                        className='wrapper-comics-list__search-form' 
                        action=""
                        onSubmit={searchComics}
                    >
                        <input 
                            className='wrapper-comics-list__search-input' 
                            type="text"
                            value={searchTerm}
                            onChange={(e)=> setSearchTerm(e.target.value)}
                        />
                        <button className='wrapper-comics-list__button'>Search</button>
                    </form>
                </div>
                    <ul className="comics">
                        {comicsCard}
                        {loadMessage}
                        {errorMessage}
                    </ul>
                    {loadButton}
            </section>
        </>
    );
};