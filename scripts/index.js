/* Проектная работа 4 (архив)

//adding Elemnts popup and form
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
//closing popup
let popupClose = function() {
    popupElement.classList.remove('popup_opened')
}
// adding function for input two texts - Name and Work
function handleFormSubmit(evt) {
    evt.preventDefault();
    accountName.textContent = nameInput.value;
    accountWork.textContent = workInput.value;
    popupClose();
}
// adding Event Listener for function popupOpen
popupOpenButton.addEventListener('click', popupOpen);
// adding Event Listener for function popupClose
popupCloseButton.addEventListener('click', popupClose);
// adding Event Listener for function handleFormSubmit
formElement.addEventListener('submit', handleFormSubmit);*/


// Проектная работа 5

// const for template
const template = document.querySelector("#element-add");
const saveButton = document.querySelector(".popup__save_type_element");
const elementsList = document.querySelector(".elements__list");
// const for big image
const popupImage = document.querySelector(".popup_type_image");
const imageFigcaption = popupImage.querySelector(".popup__image-figcaption");
const imagePicture = popupImage.querySelector(".popup__image-picture");
// const for element (popup)
const popupElementCard = document.querySelector(".popup_type_element");
const inputContainer = popupElementCard.querySelector(".popup__input-container_type_element");
const elementCardInputName = inputContainer.querySelector(".popup__account_input_element-name");
const elementCardInputUrl = inputContainer.querySelector(".popup__account_input_element-url");
const popupElementCardAddButton = document.querySelector(".profile__add-button");
// const for account (popup)
const popupAccount = document.querySelector(".popup_type_account");
const containerAccount = popupAccount.querySelector(".popup__input-container_type_account");
const accountName = document.querySelector('.profile__description-text');
const accountWork = document.querySelector('.profile__description-subtitle');
const nameInput = containerAccount.querySelector('.popup__account_input_name');
const workInput = containerAccount.querySelector('.popup__account_input_work');
const popupOpenButton = document.querySelector(".profile__edit-button");
// const for closing popup on button (кнока крестик в углу)
const popupElement = document.querySelectorAll(".popup");

// function - popup - кнопка Close
function popupCloseUp(evt) {
    if (evt.key === "Escape") {
        const popupContainer = document.querySelector(".popup_opened");
        popupClose(popupContainer);
    }
}

// function - popup - Open\Close popup
const popupOpen = function(popupContainer) {
    popupContainer.classList.add("popup_opened");
    document.addEventListener("keyup", popupCloseUp);
};
const popupClose = function(popupContainer) {
    popupContainer.classList.remove("popup_opened");
    document.removeEventListener("keyup", popupCloseUp);
};

// Open\Close popupElelment
popupElement.forEach((popupContainer) => {
    const popupCloseButton = popupContainer.querySelector(".popup__close");
    popupContainer.addEventListener("click", function(event) {
        if (event.target === popupCloseButton) {
            popupClose(popupContainer);
        }
    });
});

// section account - Open\Close
popupOpenButton.addEventListener("click", function() {
    popupOpen(popupAccount);
    nameInput.value = accountName.textContent;
    workInput.value = accountWork.textContent;
});

// section account - Save
function handleFormSubmit(evt) {
    evt.preventDefault();
    accountName.textContent = nameInput.value;
    accountWork.textContent = workInput.value;
    popupClose(popupAccount);
}

// EventListener - containerAccount for account
containerAccount.addEventListener("submit", handleFormSubmit);

// EventListener - popupElementCardAddButton for image
popupElementCardAddButton.addEventListener("click", function() {
    elementCardInputName.value = "";
    elementCardInputUrl.value = "";
    popupOpen(popupElementCard);
});

// function - delete element
function deleteElement(element) {
    element.target.closest(".element").remove();
}

// function - active Like
function clickLike(element) {
    element.target.classList.toggle("element__button_active");
}

// function - create new element
function createElement(item) {
    const elementCard = template.content.querySelector(".element").cloneNode(true);
    const elementImage = elementCard.querySelector(".element__image");
    elementImage.setAttribute("src", item.link);
    elementImage.setAttribute("alt", item.name);
    elementCard.querySelector(".element__title").textContent = item.name;
    elementCard.querySelector(".element__image").addEventListener("click", function() {
        imagePicture.src = item.link;
        imagePicture.alt = item.name;
        imageFigcaption.textContent = item.name;
        popupOpen(popupImage);
    });
    elementCard.querySelector(".element__trash").addEventListener("click", deleteElement);
    elementCard.querySelector(".element__button").addEventListener("click", clickLike);
    return elementCard;
}

// function - added elements before download page
function initialElementsFunction(initial) {
    const cards = initial.map((item) => {
        return createElement(item);
    });
    elementsList.append(...cards);
}
initialElementsFunction(initialCards);

// EventListener - Added element by account
inputContainer.addEventListener("submit", (element) => {
    element.preventDefault();
    const elementCard = createElement({
        name: elementCardInputName.value,
        link: elementCardInputUrl.value,
    });
    elementsList.prepend(elementCard);
    popupClose(popupElementCard);
});