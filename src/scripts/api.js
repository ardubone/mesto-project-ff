const baseUrl = 'https://nomoreparties.co/v1/wff-cohort-5';
const userToken = '123d08a2-0a99-4696-a359-e7de203515b4';
const cardsUrl = `${baseUrl}/cards`
const likeUrl = `${baseUrl}/cards/likes/`
const urlAvatar = `${baseUrl}/users/me/avatar/`
const userUrl = `${baseUrl}/users/me`
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  }


// гетаем карточки
export function getUserInfo() {
  return fetch(userUrl, {
    headers: {
      authorization: userToken,
    },
  })
    .then(checkResponse)
}

// гетаем юзер инфо
export function getCards() {
  return fetch(cardsUrl, {
    headers: {
      authorization: userToken,
    },
  })
    .then(checkResponse)
}

// отправляем новые данные
export function patchUserInfo(name, about) {
  return fetch(userUrl, {
    method: "PATCH",
    headers: {
      authorization: userToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then(checkResponse)
}

//новая карточка
export function postCard(name, link) {
  return fetch(cardsUrl, {
    method: "POST",
    headers: {
      authorization: userToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then(checkResponse)
}

// удаление карточки
export function deleteCardApi(id) {
  return fetch(`${cardsUrl}/${id}`, {
    method: "DELETE",
    headers: {
      authorization: userToken,
    },
  })
    .then(checkResponse)
}

//лайк
export function likeCardApi(id) {
    return fetch(`${likeUrl}/${id}`, {
      method: "PUT",
      headers: {
        authorization: userToken,
      },
    })
      .then(checkResponse)
  }

// дизлайк
export function dislikeCardApi(id) {
    return fetch(`${likeUrl}/${id}`, {
      method: "DELETE",
      headers: {
        authorization: userToken,
      },
    })
      .then(checkResponse)
  }

  //изменение аватара
export function patchAvatar(avatar) {
  return fetch(urlAvatar, {
    method: "PATCH",
    headers: {
      authorization: userToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: avatar,
    }),
  })
    .then(checkResponse)
}