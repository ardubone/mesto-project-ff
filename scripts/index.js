// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// DOM узлы
const placesList = document.querySelector(".places__list");
// Функция создания карточки
function createCard(cardData, deleteCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  // DOM узлы
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  // колбэк удаления карточки
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", () => {
      deleteCard(cardData);
    });
  cardData.element = cardElement;

  return cardElement;
}

// Функция удаления карточки
function deleteCard(cardData) {
  cardData.element.remove();
}

// Вывести карточки на страницу
initialCards.forEach((cardData) => {
  placesList.append(createCard(cardData, deleteCard));
});
