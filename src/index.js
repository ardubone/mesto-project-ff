import './pages/index.css'; // импорт главного файла стилей
import avatar from './images/avatar.jpg';
import {closeModal, openModal} from './scripts/modal.js'; //импорт функции открытия и закрытия попапа
import {initialCards, createCard, deleteCard, likeCard} from './scripts/cards.js'; // импорт функций карточки


// Изображение профиля
const profileImage = document.querySelector('.profile__image');
profileImage.style.backgroundImage = `url('${avatar}')`;

// Темплейт карточки
export const cardTemplate = document.querySelector("#card-template").content;
// dom списка карточек
const placesList = document.querySelector(".places__list");

// Вывести карточки на страницу
initialCards.forEach((cardData) => {
  placesList.append(createCard(cardData, deleteCard, likeCard, openCard));
});

// Нажатие на редактирование профиля
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
editButton.addEventListener('click', () => {
  openModal(editPopup);
});

// Нажатие на кнопку добавления карточки
const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_type_new-card');
addButton.addEventListener('click', () => {
  openModal(addPopup);
})

// функция открытия карточки - на вход берет карточку
function openCard(cardData) {

  const cardImages = document.querySelectorAll('.card__image'); // все изображения
  const popupImage = document.querySelector('.popup_type_image'); // попап с изображением
// присваиваем значения попапу из value в карточке
  popupImage.querySelector('.popup__image').src = cardData.link;
  popupImage.querySelector('.popup__image').alt = cardData.name;
  popupImage.querySelector('.popup__caption').textContent = cardData.name;
// лисенер для каждой карточки из всех
  cardImages.forEach((cardImage) => {
    cardImage
      .addEventListener('click', () => {
      openModal(popupImage);
    });
  }); 
} 

// Закрытие попапа
const closeButtons = document.querySelectorAll('.popup__close'); //находим все закрыть
// для каждой объявляем обработчик
closeButtons.forEach((closeButton) => {
  closeButton
    .addEventListener('click', () => {
      closeModal(document.querySelector('.popup_is-opened'));
      formElement.reset();//сброс формы
    }
  )
});

// закрытие по overlay
const overlay = document.querySelector('.page__content'); // объявляем весь пейдж контент оверлеем
// нажатие на область вне попапа закрытие
overlay.addEventListener('click', (popup) => {
  if (popup.target.classList.contains('popup_is-opened')) {
      closeModal(document.querySelector('.popup_is-opened'))
    }}
)

// Работа с формой редактирования
// форма в DOM
const formElement = document.forms.edit_profile;
// поля формы в DOM
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
// переменные для ввода
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_description');

// заполнение формы значениями из DOM
nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Получите значение полей jobInput и nameInput из свойства value
    const title = formElement.elements.name;
    const description = formElement.elements.description;
    nameInput = title.value;
    jobInput = description.value;
    // новые значения
    profileTitle.textContent = nameInput;
    profileDescription.textContent = jobInput;
// закрытие окна
    closeModal(document.querySelector('.popup_is-opened'))
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

// Работа с формой добавления карточки
// форма в DOM
const formPlace = document.forms.new_place;
function handleFormSubmitPlace(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    //  значение полей
    const place = formPlace.elements.place_name;
    const link = formPlace.elements.link;
    // элементы, куда должны быть вставлены значения полей
    const newData = {
        name: place.value,
        link: link.value
    };
    
    // добавляем карточку в начало списка
    placesList.prepend(createCard(newData, deleteCard, likeCard, openCard));
    formPlace.reset(); // сбросить форму
    closeModal(document.querySelector('.popup_is-opened')) // закрытие окна
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formPlace.addEventListener('submit', handleFormSubmitPlace);


