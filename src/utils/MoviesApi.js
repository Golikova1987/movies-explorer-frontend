import { BASE_URL_MOVIES_API } from "./constants";
// import { HEADERS, BASE_URL_MOVIES_API } from "./constants";

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

export const getAllMovies = () => {
    return fetch(`${BASE_URL_MOVIES_API}/beatfilm-movies`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => checkResponse(res));
};

// export const getAllMovies = () => {
//     return fetch(`${BASE_URL_MOVIES_API}/beatfilm-movies`, {
//         method: 'GET',
//         headers: HEADERS,
//     }).then((res) => checkResponse(res));
// };


// class ApiMovies {
//     constructor(options) {
//       this._url = options.baseUrl;
//     }
  
//     _checkResponse(res) {return res.ok ? res.json() : Promise.reject}
  
//     _request(url, options) {
//       return fetch(`${this._url}${url}`, options)
//         .then(this._checkResponse)
//     }
  
//     getMovies() {
//       return this._request('/')
//     }
//   }
  
//   const apiMovies = new ApiMovies({
//     baseUrl: 'https://api.nomoreparties.co/beatfilm-movies'
//   });
  
//   export default apiMovies;

// import { HEADERS, BASE_URL_MOVIES_API } from "./constants";

// const checkResponse = (res) => {
//     if (res.ok) {
//         return res.json();
//     }
//     return Promise.reject(`Ошибка: ${res.status}`);
// };

// export const getAllMovies = () => {
//     return fetch(`${BASE_URL_MOVIES_API}/beatfilm-movies`, {
//         method: 'GET',
//         headers: HEADERS,
//     }).then((res) => checkResponse(res));
// };

