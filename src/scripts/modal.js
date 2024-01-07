export let closeModal;
export let openModal;


/* openModal = (popup) => {
    popup.classList.toggle('popup_is-opened');
    popup.classList.toggle('popup_is-animated');
    document.addEventListener('keydown', closeEsc);
} */

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

export let closeEsc = (evt) => {
if (evt.key === "Escape") {
    closeModal(document.querySelector('.popup_is-opened'));
}
    }