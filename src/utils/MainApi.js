import { HEADERS, BASE_URL } from './constants.js';

// import { BASE_URL } from './constants.js';

const checkResponse = (res) => {
  if (res.ok) {
      return res.json();
  }
  return Promise.reject(res.status);
};

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: HEADERS,
      body: JSON.stringify({ name, email, password }),
  }).then((res) => checkResponse(res));
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: HEADERS,
      body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
};

export const getUserInfo = () => {
  return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: HEADERS,
  }).then((res) => checkResponse(res));
};

export const deleteCookies = () => {
  return fetch(`${BASE_URL}/signout`, {
      method: 'GET',
      credentials: 'include',
      headers: HEADERS,
  }).then((res) => checkResponse(res));
};

export const editUserInfo = (name, email) => {
  return fetch(`${BASE_URL}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: HEADERS,
      body: JSON.stringify({ name, email }),
  }).then((res) => checkResponse(res));
};

export const getMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
      method: 'GET',
      credentials: 'include',
      headers: HEADERS,
  }).then((res) => checkResponse(res));
};

export const deleteMovie = (id) => {
  return fetch(`${BASE_URL}/movies/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: HEADERS,
  }).then((res) => checkResponse(res));
};

export const createMovie = (country, director, duration, year, description, image, trailerLink, thumbnail, nameRU, nameEN, movieId) => {
  return fetch(`${BASE_URL}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: HEADERS,
      body: JSON.stringify({ country, director, duration, year, description, image, trailerLink, thumbnail, nameRU, nameEN, movieId }),
  }).then((res) => checkResponse(res));
};



// const checkResponse = (res) => {
//     if (res.ok) {
//         return res.json();
//     }
//     return Promise.reject(res.status);
// };

// export const register = (name, email, password) => {
//     return fetch(`${BASE_URL}/signup`, {
//       method: "POST",
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ name, email, password }),
//     })
//       .then(checkResponse)
//   };

// export const login = (email, password) => {
//     return fetch(`${BASE_URL}/signin`, {
//       method: "POST",
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ email, password }),
//     })
//       .then(checkResponse)
//   };

//   export const checkToken = (token) => {
//     return fetch(`${BASE_URL}/users/me`, {
//       method: "GET",
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       },
//     })
//       .then(checkResponse)
//   };

// export const getUserInfo = (token) => {
//     return fetch(`${BASE_URL}/users/me`, {
//       method: "GET",
//       headers: {
//         // 'Accept': 'application/json',
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     })
//       .then(checkResponse)
//   };

// export const getMovies = (token) => {
//     return fetch(`${BASE_URL}/movies`, {
//         method: 'GET',
//         headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//     }).then((res) => checkResponse(res));
// };

// export const deleteCookies = () => {
//     return fetch(`${BASE_URL}/signout`, {
//         method: 'GET',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
//         }
//     }).then((res) => checkResponse(res));
// };

// export const editUserInfo = (data, token) => {
//     return fetch(`${BASE_URL}/users/me/`, {
//       method: "PATCH",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         name: data.name,
//         email: data.email,
//       })
//     }).then(this._checkResponse);
//   }

// export const deleteMovie = (id, token) => {
//     return fetch(`${BASE_URL}/movies/${id}`, {
//         method: 'DELETE',
//         headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//     }).then((res) => checkResponse(res));
// };

// export const createMovie = (country, director, duration, year, description, image, trailerLink, thumbnail, nameRU, nameEN, movieId, token) => {
//     return fetch(`${BASE_URL}/movies`, {
//         method: 'POST',
//         headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         body: JSON.stringify({ country, director, duration, year, description, image, trailerLink, thumbnail, nameRU, nameEN, movieId }),
//     }).then((res) => checkResponse(res));
// };








// class ApiMain {
//     constructor(options) {
//       this._url = options.baseUrl;
//     }
  
//     _checkResponse(res) {return res.ok ? res.json() : Promise.reject(res.status)}
  
//     _request(url, options) {
//       return fetch(`${this._url}${url}`, options)
//         .then(this._checkResponse)
//     }
  
//     registration(name, email, password) {
//       return this._request('/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           name: name,
//           email: email,
//           password: password
//         })
//       })
//       }
  
//       authorization(email, password) {
//         return this._request('/signin', {
//           method: 'POST', 
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             email: email,
//             password: password
//           })
//         })
//       }
  
//       getUserData(token) {
//         return this._request('/users/me', {
//           headers: {
//             "Authorization" : `Bearer ${token}`
//           }
//         })
//       }
  
//       setUserInfo(name, email, token) {
//         return this._request('/users/me', {
//           method: 'PATCH',
//           headers: {
//             'Content-Type': 'application/json',
//             "Authorization" : `Bearer ${token}`
//           },
//           body: JSON.stringify({
//             name: name,
//             email: email,
//           })
//         })
//       }
  
//       getMovies(token) {
//         return this._request('/movies', {
//           headers: {
//             "Authorization": `Bearer ${token}`
//           }
//         })
//       }
  
//       addMovie(data, token) {
//         return this._request('/movies', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             "Authorization": `Bearer ${token}`
//           },
//           body: JSON.stringify({
//             country: data.country,
//             director: data.director,
//             duration: data.duration,
//             description: data.description,
//             year: data.year,
//             image: `https://api.nomoreparties.co${data.image.url}`,
//             trailerLink: data.trailerLink,
//             thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
//             movieId: data.id,
//             nameRU: data.nameRU,
//             nameEN: data.nameEN
//           })
//         })
//       }
  
//       deleteMovie(cardId, token) {
//         return this._request(`/movies/${cardId}`, {
//           method: 'DELETE',
//           headers: {
//             "Authorization": `Bearer ${token}`
//           }
//         })
//       }  
//     }
  
//   const apiMain = new ApiMain({
//     baseUrl: 'http://localhost:3000'
//   });
  
//   export default apiMain;