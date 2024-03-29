
import {openModal } from "./modal.js";

    // Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
const popupDelete = document.querySelector(".popup_type_delete"); // попап удаления

// Функция клонирования
const getCardTemplate = () => {
  return cardTemplate.querySelector(".card").cloneNode(true);
};

export const isLikedClass = "card__like-button_is-active";

// Функция создания карточки
export const createCard = (cardData, userData, openCard, deleteHandler, likeHandler) => {
    // DOM узлы
    const cardElement = getCardTemplate();
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const cardDeleteButton = cardElement.querySelector(".card__delete-button");
    const cardLikeButton = cardElement.querySelector(".card__like-button");
    const cardLikes = cardElement.querySelector(".card__like-counter");

    //присваиваем значения
    cardImage.src = cardData.link;
    cardTitle.textContent = cardData.name;
    cardImage.alt = cardData.name;
    cardLikes.textContent = Object.keys(cardData.likes).length;
    cardImage.dataset.id = cardData._id;

    // колбэк удаления карточки
    cardDeleteButton
        .addEventListener("click", () => {
          openModal(popupDelete);
          popupDelete.addEventListener("submit", () => {
            deleteHandler(cardData, popupDelete)
          });
        });

    // колбэк лайка
    cardLikeButton
        .addEventListener("click", () => {
          likeHandler(cardData, cardLikes, cardLikeButton);

    });
//удаление кнопки удаления
  hideDeleteButton(userData, cardData, cardDeleteButton);
//  заполнение лайками
  fillLikes(cardData, userData, cardLikeButton)

  // колбэк открытия карточки
  cardImage
        .addEventListener("click", () => {
        openCard(cardData);
    });
    cardData.element = cardElement;
    return cardElement;
  }

  // Функция удаления карточки
export const deleteCard = (cardData) => {
    cardData.element.remove();
  }

  // Функция like карточки
export const likeCard = (likeButton) => {
  likeButton.classList.toggle(isLikedClass);
  }

  // Функция проверки наличия удаления карточки
const hideDeleteButton = (userData, cardData, cardDeleteButton) => {
    if (userData._id !== cardData.owner._id) {
      cardDeleteButton.remove();
    }
  }

// функция проверки лайкнута ли карточка
function isLiked(cardData, userData) {
  return cardData.likes.some((like) => like._id === userData._id);
}

// функция заполнения лайками
function fillLikes(cardData, userData, cardLikeButton) {
  if (isLiked(cardData, userData)) {
    cardLikeButton.classList.add(isLikedClass); 
  }
}