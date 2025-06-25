import './errorMessage.scss';

export default function ErrorMessage({text}) {
    console.log('[ErrorMessage] text prop:', text);

    return(
        <section>
            <div className="comic-brutalist-loader">
                <div className="loader-container">
                    <div className="comic-panel">
                    <div className="speech-bubble">
                        <span className="loading-text">{text}</span>
                        <div className="dots">
                        <span className="dot">!</span>
                        <span className="dot">?</span>
                        <span className="dot">!</span>
                        </div>
                    </div>
                    <div className="comic-character">
                        <div className="character-head"></div>
                        <div className="character-body"></div>
                        <div className="character-eyes">
                        <div className="eye left"></div>
                        <div className="eye right"></div>
                        </div>
                        <div className="character-mouth"></div>
                    </div>
                    <div className="starburst">
                        <div className="star-spike"></div>
                        <div className="star-spike"></div>
                        <div className="star-spike"></div>
                        <div className="star-spike"></div>
                        <div className="star-spike"></div>
                        <div className="star-spike"></div>
                        <div className="star-spike"></div>
                        <div className="star-spike"></div>
                    </div>
                    </div>
                </div>
            </div>
        </section>
    )
}