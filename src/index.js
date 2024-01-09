import './pages/index.css'; // импорт главного файла стилей
import avatar from './images/avatar.jpg';
import {closeModal, openModal} from './scripts/modal.js'; //импорт функции открытия и закрытия попапа
import {initialCards} from './scripts/cards.js'; // импорт карточек
import {createCard, deleteCard, likeCard} from './scripts/card.js'; // импорт функций карточки

// Все элементы в DOM
const profileImage = document.querySelector('.profile__image'); // Изображение профиля
const editButton = document.querySelector('.profile__edit-button'); // Кнопка редактирования
const editPopup = document.querySelector('.popup_type_edit'); // Попап редактирования профиля
const placesList = document.querySelector(".places__list"); // список карточек
const addButton = document.querySelector('.profile__add-button'); // Кнопка добавления карточки
const addPopup = document.querySelector('.popup_type_new-card'); // Попап добавления карточки
const closeButtons = document.querySelectorAll('.popup__close'); //находим все закрыть

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

// установка изображения профиля
profileImage.style.backgroundImage = `url('${avatar}')`;

// Вывести дефолтные карточки на страницу
initialCards.forEach((cardData) => {
  placesList.append(createCard(cardData, deleteCard, likeCard, openCard));
});

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
} 

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
    placesList.prepend(createCard(newData, deleteCard, likeCard, openCard)); // добавляем карточку в начало списка
    formPlace.reset(); // сбросить форму
    closeModal(addPopup) // закрытие окна
}

// Прикрепляем обработчик к форме дообавления карточки на сабмит:
formPlace.addEventListener('submit', handleFormSubmitPlace);