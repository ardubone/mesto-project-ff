import { fillData } from "../index.js";

// гетаем карточки
export function getUserInfo(url, token) {
  return fetch(url, {
    headers: {
      authorization: token,
    },
  })
    .then((res) => res.json())
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

// гетаем юзер инфо
export function getCards(url, token) {
  return fetch(url, {
    headers: {
      authorization: token,
    },
  })
    .then((res) => res.json())
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

// отправляем новые данные
export function patchUserInfo(url, token, name, about) {
  return fetch(url, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      fillData(result);
      return result;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

//новая карточка
export function postCard(url, token, name, link) {
  return fetch(url, {
    method: "POST",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

// удаление карточки
export function deleteCardApi(url, token, id) {
  return fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: {
      authorization: token,
    },
  })
    .then((res) => res.json())
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}

//лайк
export function likeCardApi(url, token, id) {
    return fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        return result
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

// дизлайк
export function dislikeCardApi(url, token, id) {
    return fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((result) => {
          console.log(result)
        return result;
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }


  //изменение аватара
export function patchAvatar(url, token, avatar) {
  return fetch(url, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: avatar,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
        console.log(result)
      return result;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}