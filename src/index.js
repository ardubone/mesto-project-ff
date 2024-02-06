import './pages/index.css'; // импорт главного файла стилей
import {closeModal, openModal} from './scripts/modal.js'; //импорт функции открытия и закрытия попапа
import {createCard, deleteCard, likeCard, hideDeleteButton, fillLikes} from './scripts/card.js'; // импорт функций карточки
import {clearValidation, enableValidation} from './scripts/validation.js';


// Все элементы в DOM
const profileImage = document.querySelector('.profile__image'); // Изображение профиля
const editButton = document.querySelector('.profile__edit-button'); // Кнопка редактирования
const editPopup = document.querySelector('.popup_type_edit'); // Попап редактирования профиля
const placesList = document.querySelector(".places__list"); // список карточек
const addButton = document.querySelector('.profile__add-button'); // Кнопка добавления карточки
const addPopup = document.querySelector('.popup_type_new-card'); // Попап добавления карточки
const closeButtons = document.querySelectorAll('.popup__close'); //находим все закрыть

const avatarPopup = document.querySelector('.popup_type_avatar'); // попап смены аватара
const formAvatar = document.forms.edit_avatar; // форма смены аватара
let avatar = formAvatar.elements.avatar; // инпут с аватаром

const formEdit = document.forms.edit_profile; // форма в DOM
const title = formEdit.elements.name; //инпут имени
const description = formEdit.elements.description; //инпут работы

const popups = document.querySelectorAll('.popup'); //находим все попапы

const profileTitle = document.querySelector('.profile__title'); // имя в DOM
const profileDescription = document.querySelector('.profile__description'); // работа в DOM

const formPlace = document.forms.new_place; // форма добавдения карточки
const place = formPlace.elements.place_name; // инпут с названием
const link = formPlace.elements.link; // инпут со ссылкой

const popupImage = document.querySelector('.popup_type_image'); // попап с изображением
const srcImage = popupImage.querySelector('.popup__image'); // изображение
const captionImage = popupImage.querySelector('.popup__caption'); //описание изображения

//api переменные
import { getUserInfo, getCards, patchUserInfo, postCard, deleteCardApi, patchAvatar} from './scripts/api.js'

// Анимация попапов
popups.forEach(popup => {
    if (!popup.classList.contains('popup_is-animated')) {
      popup.classList.add('popup_is-animated');
    }
  });

//Открытие карточки
  function openCard(cardData){
    // присваиваем значения попапу из value в карточке
      srcImage.src = cardData.link;
      srcImage.alt = cardData.name;
      captionImage.textContent = cardData.name;
      openModal(popupImage);
    } 

// заполнение формы значениями из DOM
function fillPopupEdit() {
  title.value = profileTitle.textContent;
  description.value = profileDescription.textContent;
} 

// Нажатие на аватар
profileImage.addEventListener('click', () => {
  openModal(avatarPopup);
});

// Нажатие на редактирование профиля
editButton.addEventListener('click', () => {
  openModal(editPopup);
  fillPopupEdit();
});

// Нажатие на кнопку добавления карточки
addButton.addEventListener('click', () => {
  openModal(addPopup);
})

// Закрытие попапа
// для каждой объявляем обработчик
closeButtons.forEach(closeButton => {
  const popup = closeButton.closest('.popup'); // нашли родителя с нужным классом
  closeButton.addEventListener('click', () => closeModal(popup)); // закрыли попап
}); 


// закрытие по overlay
// для каждого попапа из всех объявляем обработчик
popups.forEach(popup => {
  popup.addEventListener('click', (event) => {
    if (event.target === popup) {
      closeModal(popup);
    }
  });
});

// Работа с формой редактирования
function handleFormEditSubmit(evt) {
    evt.preventDefault(); // отменяем стандартную отправку формы.
      // передаем значения в профиль
    profileTitle.textContent = title.value;
    profileDescription.textContent = description.value;
    closeModal(editPopup); // закрытие окна
    patchUserInfo(title.value, description.value)
    .then((data) => fillData(data))
} 

// Работа с формой аватара
function handleFormAvatarSubmit(evt) {
  evt.preventDefault(); // отменяем стандартную отправку формы.
    // передаем значения в аватар
  avatar = formAvatar.elements.avatar.value;
  profileImage.style.backgroundImage = `url('${avatar}')`;
  closeModal(avatarPopup); // закрытие окна
  patchAvatar(avatar)
} 

// Прикрепляем обработчик к форме аватара на сабмит:
formAvatar.addEventListener('submit', handleFormAvatarSubmit);

// Прикрепляем обработчик к форме профиля на сабмит:
formEdit.addEventListener('submit', handleFormEditSubmit);

// Работа с формой добавления карточки
function handleFormSubmitPlace(evt) {
    evt.preventDefault(); // отменяем стандартную отправку формы.
    // передаем значения в карточку
    const newData = {
        name: place.value,
        link: link.value
    };
    formPlace.reset(); // сбросить форму
    closeModal(addPopup) // закрытие окна
    postCard(newData.name, newData.link)
    .then((result) => {
        placesList.prepend(createCard(result, deleteCard, likeCard, openCard));
    })
}

// Прикрепляем обработчик к форме дообавления карточки на сабмит:
formPlace.addEventListener('submit', handleFormSubmitPlace);

//включение валидации на все формы
enableValidation()

//дефолтная очитска всех ошибок при открытии страницы
const forms = document.querySelectorAll('form');
forms.forEach(form => {
  clearValidation(form)
})

//апи функции

// функция заполнения карточек
function loadCards(userData, cardsData){
  cardsData.forEach((cardData) => {
    const newCard = createCard(cardData, deleteCard, likeCard, openCard);
    hideDeleteButton(userData, cardData, newCard);
    fillLikes(cardData, userData);
    placesList.append(newCard);
});
}

// функция заполнения данными
export function fillData(userData){
  profileDescription.textContent = userData.about;
  profileTitle.textContent = userData.name;
  profileImage.style.backgroundImage = `url('${userData.avatar}')`;
}

//заполняем все данные при открытии страницы

Promise.all([getUserInfo(), getCards()])
  .then(([userData, cardsData]) => {
    // Вывести дефолтные карточки на страницу
    loadCards(userData, cardsData);
    // Вывести дефолтные данные на страницу
    fillData(userData);
  });