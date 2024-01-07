export let closeModal;
export let openModal;
export let closeEsc;

// открытие попапа
openModal = (popup) => {
    if (!popup.classList.contains('popup_is-opened')) {
        popup.classList.add('popup_is-animated');
        popup.classList.add('popup_is-opened');
        popup.classList.remove('popup_closed');
    }
    document.addEventListener('keydown', closeEsc);
}

//закрытие попапа
closeModal = (closePopup) => { 
    closePopup.classList.add("popup_closed");
    closePopup.classList.remove("popup_is-opened");
    document.removeEventListener('keydown', closeEsc);
}

// закрытие по esc
closeEsc = (evt) => {
if (evt.key === "Escape") {
    closeModal(document.querySelector('.popup_is-opened'));
}
    }