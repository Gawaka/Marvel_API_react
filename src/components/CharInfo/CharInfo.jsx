import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { getCharacterById } from '../../service/MarvelService';
import LoadMessage from '../LoadMessage/LoadMessage';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './charInfo.scss';

export default function CharInfo() {
    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const location = useLocation();
    const { charId } = location.state || {};


    useEffect(()=> {
        if (!charId) return;

        setLoading(true);
        console.log('[CharInfo] Отримано ID персонажа:', charId);
        getCharacterById(charId)
                .then((char) => setChar(char))
            .catch(error=> {
                setError(true);
                console.log('Error');
            })
            .finally(()=> setLoading(false))
    }, [charId]);

    function renderCharIfoCard() {
        const {name, description, thumbnail, comics} = char;

        return(
            <div className="character-info">
                <Link to='/'><span>Back</span></Link>
                <div className="character-info__wrapper">
                <h2 className="character-info__name">{name}</h2>
                <img className="character-info__thumbnail" src={thumbnail} alt={name}/>
                <p className='character-info__description'>{description}</p>
                    <ul className='character-info__comics'>
                        {comics.map((item, i)=> (
                            <li className='character-info__comics-item' key={i}>
                                {/* {item.name} */}
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    };

    const charIfoCard = char && renderCharIfoCard();
    const loadMessage = loading ? <LoadMessage/> : null;
    const errorMessage = error && !loading ? <ErrorMessage/> : null;

    return(
        <>
            {loadMessage}
            {errorMessage}
            {!loading && !error && charIfoCard}
        </>
    )
}