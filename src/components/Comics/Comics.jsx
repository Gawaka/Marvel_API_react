import './comics.scss';

export default function Comics() {

    return(
        <>
            <section className="wrapper-comics-list">
                <div className="wrapper-comics-list__actions">
                    <h2 className='wrapper-comics-list__title'>Comics</h2>
                    <form className='wrapper-comics-list__searchForm' action="">
                        <input className='wrapper-comics-list__search-input' type="text" />
                        <button className='wrapper-comics-list__button'></button>
                    </form>
                    <ul className='comics'>
                        <li className='comics__card'>
                            <h3 className='comics__name'>name</h3>
                            <p className="comics__date"></p>
                            <img className='comics__thumbnail' src="#" alt="#" />
                            <p className="comics__description">description</p>
                            <p className="comics__price"></p>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    );
};