//dom
const textPattern = /^[a-zA-Zа-яА-Я\s-]*$/;
const errorText = 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы';
// const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?.*\.(jpg|jpeg|png|gif|bmp|svg)$/i;

// вывод ошибки
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
};

// скрытие ошибки
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.textContent = '';
};

// Функция для проверки валидности поля
function checkInputValidity (formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
    return false;
  } 
  if (inputElement.type !== 'url' && !textPattern.test(inputElement.value)) {
    showInputError(formElement, inputElement, errorText);
    return false;
}
  else {
    hideInputError(formElement, inputElement);
    return true;
  }
};

// Функция для управления активностью кнопки сохранения
const toggleSaveButton = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
      buttonElement.classList.add('popup__button_disabled');
    } else {
        buttonElement.classList.remove('popup__button_disabled');
    }};

// Функция для проверки валидности каждого поля
    const hasInvalidInput = (inputList) => {
      return !inputList.every((inputElement) => {
        return checkInputValidity(inputElement.parentElement, inputElement);
      });
    };

// Функция для добавления слушателя проверка инпутов и управления кнопкой
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
    checkInputValidity(formElement, inputElement);
    toggleSaveButton(inputList, buttonElement);
    });
  });
};


// Функция для проверки валидности формы
export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

// функция очистки текста под инпутом
function clearInputText(formElement) {
  const errorElements = formElement.querySelectorAll('.popup__error-text');
  errorElements.forEach(errorElement => {
    errorElement.textContent = '';
  });
}

// функция очистки стилей ошибки
function clearErrorStyle(formElement) {
  const inputElements = formElement.querySelectorAll('.popup__input_type_error');
  inputElements.forEach(inputElement => {
    inputElement.classList.remove('popup__input_type_error');
  });
}

// деактивация кнопки
function disableButton(formElement) {
  const buttonElement = formElement.querySelector('.popup__button');
  buttonElement.classList.add('popup__button_disabled');
}
// Функция для очистки ошибок
export function clearValidation(formElement) {
  clearInputText(formElement);
  clearErrorStyle(formElement);
  disableButton(formElement);
}