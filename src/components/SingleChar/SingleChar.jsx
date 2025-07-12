import { useState, useEffect } from "react";
import { getCharacter } from "../../service/MarvelService";
import LoadMessage from '../LoadMessage/LoadMessage';
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Button from '../Button/Button';

import './singleChar.scss';

export default function SingleChar() {
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    const updateChar = ()=> {
    setLoading(true);
    setError(false);
    getCharacter()
        .then(char=> {
            console.log('Update char is worked');
            setCharacter(char);
        })
        .catch(error=> {
            setError(true);
            console.log('Error');
        })
        .finally(()=> {
            setLoading(false);
            setError(false);
        })
    };

    useEffect(()=> {
        console.log('useEffect single char complete');
        updateChar();
    }, []);

    function renderCharacter() {
        if (!character) return null;

        const {name, thumbnail, description, id} = character;
        return (
            <li className="character__card" key={id}>
                <h3 className="character__name">{name}</h3>
                <div className="character__about-wrapper">
                    <img
                        className={`character__thumbnail ${thumbnail.includes('image_not_available') ? 'characters__thumbnail--contain' : ''}`}
                        src={thumbnail}
                        alt={name}
                    />
                    <p className="character__description">{description}</p>
                </div>
            </li>
        )
    };

    const char = !loading && !error ? renderCharacter() : null;
    const loadMessage = loading ? <LoadMessage className="character__loading"/> : null;
    const newChar = <Button text={'New character'} className="character__btn" onClick={updateChar}/>;
    const errorMessage = error && !loading ? <ErrorMessage text="try again"/> : null;
    

    return(
        <>
            <section className="single-character-wrapper">
                <ul className="character">
                    {errorMessage}
                    {loadMessage}
                    {char}
                </ul>
                {newChar}
            </section>
        </>
    )
}