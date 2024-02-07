//dom
const textPattern = /^[a-zA-Zа-яА-Я\s-]*$/;
const errorText = 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы';
// const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?.*\.(jpg|jpeg|png|gif|bmp|svg)$/i;

//получить еррор селектор
function getErrorSelector(inputId) {
  return `.${inputId}-error`;
}

// вывод ошибки
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorSelector = getErrorSelector(inputElement.id);
  const errorElement = formElement.querySelector(errorSelector);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
};

// скрытие ошибки
const hideInputError = (formElement, inputElement, config) => {
  const errorSelector = getErrorSelector(inputElement.id);
  const errorElement = formElement.querySelector(errorSelector);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
};

// Функция для проверки валидности поля
function checkInputValidity (formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
    return false;
  } 
  if (inputElement.type !== 'url' && !textPattern.test(inputElement.value)) {
    showInputError(formElement, inputElement, errorText, config);
    return false;
}
  else {
    hideInputError(formElement, inputElement, config);
    return true;
  }
};

// Функция для управления активностью кнопки сохранения
const toggleSaveButton = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList, config)) {
      buttonElement.classList.add(config.popupButtonDisabled);
    } else {
        buttonElement.classList.remove(config.popupButtonDisabled);
    }};

// Функция для проверки валидности каждого поля
    const hasInvalidInput = (inputList, config) => {
      return !inputList.every((inputElement) => {
        return checkInputValidity(inputElement.parentElement, inputElement, config);
      });
    };

// Функция для добавления слушателя проверка инпутов и управления кнопкой
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.popupInput));
  const buttonElement = formElement.querySelector(config.popupButton);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
    checkInputValidity(formElement, inputElement, config);
    toggleSaveButton(inputList, buttonElement, config);
    });
  });
};


// Функция для проверки валидности формы
export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.popupForm));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
};

// функция очистки текста под инпутом
function clearInputText(formElement, config) {
  const errorElements = formElement.querySelectorAll(config.popupErrortext);
  errorElements.forEach(errorElement => {
    errorElement.textContent = '';
  });
}

// функция очистки стилей ошибки
function clearErrorStyle(formElement, config) {
  const inputElements = formElement.querySelectorAll(config.popupInput);
  inputElements.forEach(inputElement => {
    inputElement.classList.remove(config.popupInputInvalid);
    inputElement.classList.remove(config.inputErrorClass);
  });
}

// деактивация кнопки
function disableButton(formElement, config) {
  const buttonElement = formElement.querySelector(config.popupButton);
  buttonElement.classList.remove(config.popupButtonDisabled);
}
// Функция для очистки ошибок
export function clearValidation(formElement, config) {
  clearInputText(formElement,config);
  clearErrorStyle(formElement, config);
  disableButton(formElement, config);
}