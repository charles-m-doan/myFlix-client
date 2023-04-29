export const BASE_PATH = 'https://siders-myflix.herokuapp.com';

export const loginUser = (username, password) => {
    const data = {
      Username: username.trim(),
      Password: password,
    };
  
    return fetch(`${BASE_PATH}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
          return { user: data.user, token: data.token };
        } else {
          throw new Error('No such user');
        }
      });
  };

  export const fetchMovies = (token) => {
    if (!token) {
      return Promise.reject('No token provided');
    }
  
    return fetch(`${BASE_PATH}/movies`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  };
  
  export const addToFavorites = (userName, movieId, accessToken) => {
    return fetch(
      `${BASE_PATH}/users/${userName}/movies/${movieId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  };

  export const getUserFavorites = (userName, token) => {
    return fetch(`${BASE_PATH}/users/${userName}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  };
  
  export const updateUser = (userName, data, token) => {
    return fetch(`${BASE_PATH}/users/${userName}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json());
  };
  
  export const deleteAccount = (userName, token) => {
    return fetch(`${BASE_PATH}/users/${userName}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => response.ok);
  };
  