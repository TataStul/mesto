// adding Elemnts popup and form
let popupElement = document.querySelector('.popup');
let formElement = popupElement.querySelector('.popup__input-container');
// adding Buttons in popup - close and open
let popupOpenButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close');
// adding Inputs in form - name and work
let nameInput = formElement.querySelector('.popup__account_input_name');
let workInput = formElement.querySelector('.popup__account_input_work');
// adding Inputs from section Profile - name and work
let accountName = document.querySelector('.profile__description-text');
let accountWork = document.querySelector('.profile__description-subtitle');
//opening popup
let popupOpen = function() {
        popupElement.classList.add('popup_opened');
        nameInput.value = accountName.textContent;
        workInput.value = accountWork.textContent;
    }
    // adding Event Listener for function popupOpen
popupOpenButton.addEventListener('click', popupOpen);
//closing popup
let popupClose = function() {
        popupElement.classList.remove('popup_opened')
    }
    // adding Event Listener for function popupClose
popupCloseButton.addEventListener('click', popupClose);
// adding function for input two texts - Name and Work
function handleFormSubmit(evt) {
    evt.preventDefault();
    accountName.textContent = nameInput.value;
    accountWork.textContent = workInput.value;
    popupClose();
}
// adding Event Listener for function handleFormSubmit
formElement.addEventListener('submit', handleFormSubmit);