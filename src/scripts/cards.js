export let createCard;
export let deleteCard;
export let likeCard;
import { cardTemplate } from "..";

//дефолтные карточки
export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

// Функция создания карточки
createCard = (cardData, deleteCard, likeCard, openCard) => {
  // DOM узлы
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  //присваиваем значения
  cardImage.src = cardData.link;
  cardTitle.textContent = cardData.name;
  cardImage.alt = cardData.name;
  // колбэк удаления карточки
  cardDeleteButton
    .addEventListener("click", () => {
      deleteCard(cardData);
    });

  // колбэк лайка
  cardLikeButton
    .addEventListener("click", () => {
    likeCard(cardData);
  });

// колбэк открытия карточки
  cardElement
    .addEventListener("click", () => {
    openCard(cardData);
});

  cardData.element = cardElement;
  return cardElement;
}

// Функция удаления карточки
deleteCard = (cardData) => {
  cardData.element.remove();
}

// Функция like карточки
likeCard = (cardData) => {
  cardData.element.querySelector(".card__like-button").classList.toggle("card__like-button_is-active");
}