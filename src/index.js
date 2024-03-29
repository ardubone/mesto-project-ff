import "./pages/index.css"; // импорт главного файла стилей
import { closeModal, openModal } from "./scripts/modal.js"; //импорт функции открытия и закрытия попапа
import { createCard, deleteCard, isLikedClass, likeCard } from "./scripts/card.js"; // импорт функций карточки
import { clearValidation, enableValidation } from "./scripts/validation.js";
import {
  getUserInfo,
  getCards,
  patchUserInfo,
  postCard,
  patchAvatar,
  deleteCardApi,
  likeCardApi,
  dislikeCardApi
} from "./scripts/api.js";
import { errorLog, showLoading } from "./scripts/utils.js";

// Все элементы в DOM
const profileImage = document.querySelector(".profile__image"); // Изображение профиля
const editButton = document.querySelector(".profile__edit-button"); // Кнопка редактирования
const editPopup = document.querySelector(".popup_type_edit"); // Попап редактирования профиля
const placesList = document.querySelector(".places__list"); // список карточек
const addButton = document.querySelector(".profile__add-button"); // Кнопка добавления карточки
const addPopup = document.querySelector(".popup_type_new-card"); // Попап добавления карточки
const closeButtons = document.querySelectorAll(".popup__close"); //находим все закрыть

const avatarPopup = document.querySelector(".popup_type_avatar"); // попап смены аватара
const formAvatar = document.forms.edit_avatar; // форма смены аватара
let avatar = formAvatar.elements.avatar; // инпут с аватаром

const formDelete = document.forms.delete; // форма удаления

const formEdit = document.forms.edit_profile; // форма в DOM
const title = formEdit.elements.name; //инпут имени
const description = formEdit.elements.description; //инпут работы

const popups = document.querySelectorAll(".popup"); //находим все попапы

const profileTitle = document.querySelector(".profile__title"); // имя в DOM
const profileDescription = document.querySelector(".profile__description"); // работа в DOM

const formPlace = document.forms.new_place; // форма добавдения карточки
const place = formPlace.elements.place_name; // инпут с названием
const link = formPlace.elements.link; // инпут со ссылкой

const popupImage = document.querySelector(".popup_type_image"); // попап с изображением
const srcImage = popupImage.querySelector(".popup__image"); // изображение
const captionImage = popupImage.querySelector(".popup__caption"); //описание изображения

const validationConfig = {
  inputErrorClass: "popup__input_type_error",
  popupButtonDisabled: "popup__button_disabled",
  popupInput: ".popup__input",
  popupButton: ".popup__button",
  popupForm: ".popup"
};

// Анимация попапов
popups.forEach((popup) => {
  if (!popup.classList.contains("popup_is-animated")) {
    popup.classList.add("popup_is-animated");
  }
});

//Открытие карточки
function openCard(cardData) {
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
profileImage.addEventListener("click", () => {
  openModal(avatarPopup);
  clearValidation(avatarPopup, validationConfig);
});

// Нажатие на редактирование профиля
editButton.addEventListener("click", () => {
  openModal(editPopup);
  fillPopupEdit();
  clearValidation(editPopup, validationConfig);
});

// Нажатие на кнопку добавления карточки
addButton.addEventListener("click", () => {
  openModal(addPopup);
  clearValidation(addPopup, validationConfig);
});

// Закрытие попапа
// для каждой объявляем обработчик
closeButtons.forEach((closeButton) => {
  const popup = closeButton.closest(".popup"); // нашли родителя с нужным классом
  closeButton.addEventListener("click", () => closeModal(popup)); // закрыли попап
});

// закрытие по overlay
// для каждого попапа из всех объявляем обработчик
popups.forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closeModal(popup);
    }
  });
});

// Работа с формой редактирования
function handleFormEditSubmit(evt) {
  evt.preventDefault(); // отменяем стандартную отправку формы.
  showLoading(true, editPopup);
  patchUserInfo(title.value, description.value)
    .then((data) => {
      fillData(data);
      profileTitle.textContent = title.value;
      profileDescription.textContent = description.value;
      closeModal(editPopup); // закрытие окна
    })
    .catch((error) => {
      errorLog(error);
    })
    .finally(() => {
      showLoading(false, editPopup);
    });
}

// Работа с формой удаления карточки
function handleFormDeleteSubmit(data, modal) {
  // Используем `currentCardData`, сохраненную при открытии формы
  const cardId = data._id;
  deleteCardApi(cardId)
    .then(() => {
      deleteCard(data); // Удаляем карточку из DOM
      closeModal(modal);
    })
    .catch((error) => {
      errorLog(error);
    });
}
// Работа с формой аватара
function handleFormAvatarSubmit(evt) {
  evt.preventDefault(); // отменяем стандартную отправку формы.
  showLoading(true, avatarPopup);
  avatar = formAvatar.elements.avatar.value;
  patchAvatar(avatar)
    .then(() => {
      // передаем значения в аватар
      profileImage.style.backgroundImage = `url('${avatar}')`;
      formAvatar.reset();
      closeModal(avatarPopup); // закрытие окна
    })
    .catch((error) => {
      errorLog(error);
    })
    .finally(() => {
      showLoading(false, avatarPopup);
    });
}

// хэндлер лайков
function likeCardHandler(data, dataLikes, buttonLike) {
  if (!buttonLike.classList.contains(isLikedClass)) {
    likeCard(buttonLike);
    likeCardApi(data._id)
    .then((res) => {
      dataLikes.textContent = res.likes.length;
    })
    .catch((err) => {
        errorLog(err);
    })
  }
    else {
      likeCard(buttonLike);
      dislikeCardApi(data._id)
      .then((res) => {
        dataLikes.textContent = res.likes.length;
    })
    .catch((err) => {
        errorLog(err);
    })
    }
}

// Прикрепляем обработчик к форме аватара на сабмит:
formAvatar.addEventListener("submit", handleFormAvatarSubmit);

// Прикрепляем обработчик к форме профиля на сабмит:
formEdit.addEventListener("submit", handleFormEditSubmit);

// Работа с формой добавления карточки
function handleFormSubmitPlace(evt) {
  evt.preventDefault(); // отменяем стандартную отправку формы.
  showLoading(true, addPopup);
  // передаем значения в карточку
  const newData = {
    name: place.value,
    link: link.value,
  };
  postCard(newData.name, newData.link)
    .then((result) => {
      placesList.prepend(createCard(result, result.owner, openCard, handleFormDeleteSubmit, likeCardHandler));
      formPlace.reset(); // сбросить форму
      closeModal(addPopup); // закрытие окна
    })
    .catch((error) => {
      errorLog(error);
    })
    .finally(() => {
      showLoading(false, addPopup);
    });
}

// Прикрепляем обработчик к форме дообавления карточки на сабмит:
formPlace.addEventListener("submit", handleFormSubmitPlace);

//включение валидации на все формы
enableValidation(validationConfig);

//апи функции

// функция заполнения карточек
function loadCards(userData, cardsData) {
  cardsData.forEach((cardData) => {
    const newCard = createCard(cardData, userData, openCard, handleFormDeleteSubmit, likeCardHandler);
    placesList.append(newCard);
  });
}

// функция заполнения данными
function fillData(userData) {
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
  })
  .catch((error) => {
    errorLog(error);
  });
