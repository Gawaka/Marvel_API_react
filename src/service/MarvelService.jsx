import axios from 'axios';

const _apiBase = 'https://gateway.marvel.com:443/v1/public';
const _apiKey = '44ea9d55b5b931eb16b58f5322bd8b9a';
const _baseOffset = 300;
// const _baseOffset = 0;

const getAllCharacters = async (page = 1, limit = 21) => {
    const offset = _baseOffset + (page - 1) * limit;

    return await axios.get(`${_apiBase}/characters?limit=${limit}&offset=${offset}&apikey=${_apiKey}`)
        .then(response => {
        const results = response.data.data.results;
        const filteredCharacters = validateData(results)

        console.log('[getAllCharacters] Після валідації:', filteredCharacters);

        return filteredCharacters;
        })
        .catch(error => {
        console.error('Помилка при отриманні персонажів:', error);
        throw error;
    });
};

const getCharacterByName = async (name)=> {

    return await axios.get(`${_apiBase}/characters?nameStartsWith=${name}&apikey=${_apiKey}`)
        .then(response=> {
            const results = response.data.data.results;
            const filteredCharacterName = validateData(results);

            return filteredCharacterName;
        })
        .catch(error => {
        console.error("Помилка при отриманні персонажa за ім'ям", error);
        throw error;
    });
};


const getCharacter = async (attempt = 1)=> {
    const id = Math.floor(Math.random() * (1011300 - 1011000) + 1011000);

    return await axios.get(`${_apiBase}/characters/${id}?apikey=${_apiKey}`)
        .then(response=> {
            const results = response.data.data.results;
            const filteredCharacter = validateData(results);
            console.log('[getCharacter] Після валідації:', filteredCharacter);

            if (filteredCharacter.length === 0) {
                if(attempt >= 10) {
                    throw new Error('5 невдалих спроб отримати валідного персонажа');
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

function validateData(arr) {
    const valid = arr.filter(char=> !char.thumbnail.path.includes('image_not_available'))
    
    return valid.map(char => {
    const { id, name, description, thumbnail, comics, urls } = char;

        return {
            id,
            name: name.length > 17 ? name.slice(0, 15) + '...' : name,
            description: description || 'There is not description for this character :(',
            thumbnail: `${thumbnail.path}.${thumbnail.extension}`,
            comics,
            wiki: urls.find(url => url.type === 'wiki')?.url || null,
            details: urls.find(url => url.type === 'detail')?.url || null
        };
    });
};


export { getAllCharacters, getCharacter, getCharacterByName };
