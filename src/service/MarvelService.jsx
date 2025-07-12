import axios from 'axios';

// const _apiBase = 'https://gateway.marvel.com:443/v1/public'; // оріг
// const _apiKey = '44ea9d55b5b931eb16b58f5322bd8b9a'; /// оріг
// const _baseOffset = 300; // // ориг офсет
const _apiBase = 'https://marvel-server-zeta.vercel.app';
const _apiKey = 'd4eecb0c66dedbfae4eab45d312fc1df';
const _baseOffset = 0;

const getAllCharacters = async (page = 1, limit = 5) => {       // // limit = 21 ориг
    const offset = _baseOffset + (page - 1) * limit;

    // return await axios.get(`${_apiBase}/characters?limit=${limit}&offset=${offset}&apikey=${_apiKey}`)
    return await axios.get(`${_apiBase}/characters?limit=${limit}&offset=${offset}&apikey=${_apiKey}`)
        .then(response => {
        const results = response.data.data.results;
        const filteredCharacters = validateChar(results)
        console.log('getAllCharacters Після валідації:', filteredCharacters);
        return filteredCharacters;
        })
        .catch(error => {
        console.error('Помилка при отриманні персонажів:', error);
        throw error;
    });
};

    const getCharacterByName = async (name) => {
        // // return await axios.get(`${_apiBase}/characters?nameStartsWith=${name}&apikey=${_apiKey}`)
        return await axios.get(`https://marvel-server-zeta.vercel.app/characters?apikey=${_apiKey}`)
            .then(response => {
                const results = response.data.data.results;
                const validCharacter = validateChar(results);
                const filteredCharacter = validCharacter.filter(item =>
                    item.name.toLowerCase().includes(name.toLowerCase())
                );
                return filteredCharacter;
            })
            .catch(error => {
                console.error("Помилка при отриманні персонажa за ім'ям", error);
                throw error;
            });
    };


const getCharacterById = async (id) => {
    // return await axios.get(`${_apiBase}/characters/${id}?apikey=${_apiKey}`)
    return await axios.get(`https://marvel-server-zeta.vercel.app/characters/${id}?apikey=d4eecb0c66dedbfae4eab45d312fc1df`)
        .then(response=> {
            const results = response.data.data.results;
            const filteredCharacterId = validateChar(results)
            console.log('[getCharacterById] results:', results);
            return filteredCharacterId[0]; // Адаптуєш під свій трансформер
        });
};

const getCharacter = async (attempt = 1)=> {
    // const id = Math.floor(Math.random() * (1011300 - 1011000) + 1011000); оріг
    const id = Math.floor(Math.random() * (20 - 1) + 1);

    // return await axios.get(`${_apiBase}/characters/${id}?apikey=${_apiKey}`)
    return await axios.get(`https://marvel-server-zeta.vercel.app/characters/${id}?apikey=d4eecb0c66dedbfae4eab45d312fc1df`)
        .then(response=> {
            const results = response.data.data.results;
            const filteredCharacter = validateChar(results);
            console.log('[getCharacter] Після валідації:', filteredCharacter);

            if (filteredCharacter.length === 0) {
                if(attempt >= 10) {
                    throw new Error('5 невдалих спроб отримати персонажа');
                }
                return getCharacter(attempt + 1);
            }
            return filteredCharacter[0];
        })
        .catch(error => {
        console.error('Помилка при отриманні одного персонажа:', error);
        throw error;
    });
};

const getAllComics = async (page = 1, limit = 5)=> {
        const offset = _baseOffset + (page - 1) * limit;
        return await axios.get(`https://marvel-server-zeta.vercel.app/comics?limit=${limit}&offset=${offset}&apikey=d4eecb0c66dedbfae4eab45d312fc1df`)
        .then(response=> {
            const results = response.data.data.results;
            console.log(results);
            const validComics = validateComics(results)
            return validComics;
        })
        .catch(error => {
            console.error('Помилка при отриманні коміксів:', error);
            throw error;
        });
};

const getComicsByName = async (title)=> {
    return await axios.get(`https://marvel-server-zeta.vercel.app/comics?&apikey=d4eecb0c66dedbfae4eab45d312fc1df`)
        .then(response=> {
            const result = response.data.data.results;
            const validComics = validateComics(result);
            const filterComics = validComics.filter(item =>
                item.title?.toLowerCase().includes(title?.toLowerCase())
        );
        
        return filterComics;
    })
    .catch((error=> {
        console.log("Помилка при отриманні коміксу за ім'ям", error);
        throw error;
    }));
};

function validateChar(arr) {
    const valid = arr.filter(char=> !char.thumbnail.path.includes('image_not_available'))
    
    return valid.map(char => {
    const { id, name, description, thumbnail, comics, urls } = char;

        return {
            id,
            name: name.length > 17 ? name.slice(0, 15) + '...' : name,
            description: description || 'There is not description for this character :(',
            thumbnail: `${thumbnail.path}.${thumbnail.extension}`,
            comics: comics.items,
            wiki: urls.find(url => url.type === 'wiki')?.url || null,
            details: urls.find(url => url.type === 'detail')?.url || null
        };
    });
};

function validateComics(arr) {
    return arr.map(comic=> {
        const {id, title, description, pageCount, prices, thumbnail, textObjects} = comic;

        return {
            id, 
            title: title,
            description: description,
            pages: pageCount,
            price: prices[0].price,
            thumbnail: `${thumbnail.path}.${thumbnail.extension}`,
            language: textObjects.languages
        }
    })
}


export { 
        getAllCharacters, 
        getCharacter, 
        getCharacterByName, 
        getCharacterById,
        getAllComics,
        getComicsByName
    };
