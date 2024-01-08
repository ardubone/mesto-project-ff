// Функция создания карточки
export const createCard = (cardData, deleteCard, likeCard, openCard) => {
    // Темплейт карточки
    const cardTemplate = document.querySelector("#card-template").content;
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
export const likeCard = (cardData) => {
    cardData.element.querySelector(".card__like-button").classList.toggle("card__like-button_is-active");
  }