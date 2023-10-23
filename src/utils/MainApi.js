import { BASE_URL } from './constants';

//проверка результата
const checkResponse = (res) => {
  if (res.ok) {
      return res.json();
  }
  return Promise.reject(res.error);
};

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then((res) => checkResponse(res));
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => checkResponse(res));
};

//возвращает токен пользователя
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
    .then((res) => checkResponse(res));
};

// получаем информарцию о пользователе
export const getUserInfo = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  })
    .then((res) => checkResponse(res));
};

//возвращает сохраненные фильмы
export const getSavedMovies = (token) => {
  return fetch(`${BASE_URL}/movies`, {
      method: 'GET',
      headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
  }).then((res) => checkResponse(res));
};

//изменяет данные пользователя
export const editUserInfo = (data, token) => {
  return fetch(`${BASE_URL}/users/me/`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
    })
  }).then(checkResponse);
};

//удаляет фильм
export const deleteMovie = (id, token) => {
  return fetch(`${BASE_URL}/movies/${id}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
  }).then((res) => checkResponse(res));
};

export const createMovie = (country, director, duration, year, description, image, trailerLink, thumbnail, nameRU, nameEN, movieId, token) => {
return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ country, director, duration, year, description, image, trailerLink, thumbnail, nameRU, nameEN, movieId }),
}).then((res) => checkResponse(res));
};