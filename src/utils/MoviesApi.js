import { BASE_URL_MOVIES_API } from "./constants";

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.error}`);
};
//возвращает все фильмы
export const getAllMovies = () => {
    return fetch(`${BASE_URL_MOVIES_API}/beatfilm-movies`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => checkResponse(res));
};