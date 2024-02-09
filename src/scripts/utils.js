//показ ошибки
export function errorLog(message) {
  console.error("Ошибка:", message);
}

//лоадинг сохранить
export function showLoading(isLoading, popup) {
  const button = popup.querySelector(".popup__button");
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}
