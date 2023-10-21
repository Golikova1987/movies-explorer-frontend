import { BASE_URL } from './constants';

const checkResponse = (res) => {
  if (res.ok) {
      return res.json();
  }
  return Promise.reject(res.status);
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
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => checkResponse(res));
};

export const checkUser = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
    .then((res) => checkResponse(res));
};

//////////////////////////

export const getUserInfo = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  })
    .then((res) => checkResponse(res));
};

export const getMovies = (token) => {
  return fetch(`${BASE_URL}/movies`, {
      method: 'GET',
      credentials: 'include',
      headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
  }).then((res) => checkResponse(res));
};

export const editUserInfo = (data, token) => {
  return fetch(`${BASE_URL}/users/me/`, {
    method: "PATCH",
    credentials: 'include',
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

export const deleteMovie = (id, token) => {
  return fetch(`${BASE_URL}/movies/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
  }).then((res) => checkResponse(res));
};

export const createMovie = (country, director, duration, year, description, image, trailerLink, thumbnail, nameRU, nameEN, movieId, token) => {
return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ country, director, duration, year, description, image, trailerLink, thumbnail, nameRU, nameEN, movieId }),
}).then((res) => checkResponse(res));
};