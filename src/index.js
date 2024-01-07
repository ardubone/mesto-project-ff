// index.js
import './pages/index.css'; // импорт главного файла стилей
import {initialCards} from './scripts/cards.js';
import avatar from './images/avatar.jpg';
import {closeModal, openModal} from './scripts/modal.js';

const profileImage = document.querySelector('.profile__image');
profileImage.style.backgroundImage = `url('${avatar}')`;

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// DOM узлы
const placesList = document.querySelector(".places__list");
// Функция создания карточки
function createCard(cardData, deleteCard, likeCard, openCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  // DOM узлы
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardElement.querySelector(".card__image").alt = cardData.name;
  // колбэк удаления карточки
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", () => {
      deleteCard(cardData);
    });

  // колбэк лайка
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", () => {
    likeCard(cardData);
  });

// колбэк открытия карточки
cardElement.addEventListener("click", () => {
  openCard(cardData);
});

  cardData.element = cardElement;

  return cardElement;
}

// Функция удаления карточки
function deleteCard(cardData) {
  cardData.element.remove();
}

// Функция like карточки
function likeCard(cardData) {
  cardData.element.querySelector(".card__like-button").classList.toggle("card__like-button_is-active");
}


// Вывести карточки на страницу
initialCards.forEach((cardData) => {
  placesList.append(createCard(cardData, deleteCard, likeCard, openCard));
});

// Нажатие на редактирование профиля

const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
editButton.addEventListener('click', () => {openModal(editPopup)});

// Нажатие на кнопку добавления карточки
const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_type_new-card');
addButton.addEventListener('click', () => {openModal(addPopup)})

// функция открытия карточки

function openCard(cardData) {
  const cardImages = document.querySelectorAll('.card__image');
  const popupImage = document.querySelector('.popup_type_image');
  popupImage.querySelector('.popup__image').src = cardData.link;
  popupImage.querySelector('.popup__image').alt = cardData.name;
  popupImage.querySelector('.popup__caption').textContent = cardData.name;
  cardImages.forEach((cardImage) => {
    cardImage.addEventListener('click', () => {
      openModal(popupImage);
    });
  }); 
} 



// Закрытие попапа

const closeButtons = document.querySelectorAll('.popup__close');
closeButtons.forEach((closeButton) => {
  closeButton.addEventListener('click', () => {
    closeModal(document.querySelector('.popup_is-opened'));
    formElement.reset();
  })
}); 

// закрытие по overlay
const overlay = document.querySelector('.page__content');
overlay.addEventListener('click', (popup) => {
  if (popup.target.classList.contains('popup_is-opened')) {
      closeModal(document.querySelector('.popup_is-opened'))
    }}
)

// Работа с формой редактирования
// Находим форму в DOM
const formElement = document.forms.edit_profile;
// Находим поля формы в DOM
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_description');
nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Получите значение полей jobInput и nameInput из свойства value
    const title = formElement.elements.name;
    const description = formElement.elements.description;
    nameInput = title.value;
    jobInput = description.value;
    // Выберите элементы, куда должны быть вставлены значения полей
  
    // Вставьте новые значения с помощью textContent
    profileTitle.textContent = nameInput;
    profileDescription.textContent = jobInput;

    closeModal(document.querySelector('.popup_is-opened'))
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

// Работа с формой добавления карточки
// Находим форму в DOM
const formPlace = document.forms.new_place;
function handleFormSubmitPlace(evt) {
    evt.preventDefault();
    const place = formPlace.elements.place_name;
    const link = formPlace.elements.link;
    // Выберите элементы, куда должны быть вставлены значения полей
    const newData = {
        name: place.value,
        link: link.value
    };
    

    placesList.prepend(createCard(newData, deleteCard, likeCard, openCard));
    formPlace.reset();
    closeModal(document.querySelector('.popup_is-opened'))
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formPlace.addEventListener('submit', handleFormSubmitPlace);


