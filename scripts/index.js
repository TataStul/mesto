// const for template
const template = document.querySelector("#element-add");
const elementsList = document.querySelector(".elements__list");
// const for big image
const popupImage = document.querySelector(".popup_type_image");
const imageFigcaption = popupImage.querySelector(".popup__image-figcaption");
const imagePicture = popupImage.querySelector(".popup__image-picture");
// const for element (popup)
const popupElementCard = document.querySelector(".popup_type_element");
const inputContainerElement = popupElementCard.querySelector(".popup__input-container_type_element");
const elementCardInputName = inputContainerElement.querySelector(".popup__account_input_element-name");
const elementCardInputUrl = inputContainerElement.querySelector(".popup__account_input_element-url");
const addPopupElementCardButton = document.querySelector(".profile__add-button");
// const for account (popup)
const popupAccount = document.querySelector(".popup_type_account");
const containerAccount = popupAccount.querySelector(".popup__input-container_type_account");
const accountName = document.querySelector('.profile__description-text');
const accountWork = document.querySelector('.profile__description-subtitle');
const nameInput = containerAccount.querySelector('.popup__account_input_name');
const workInput = containerAccount.querySelector('.popup__account_input_work');
const openPopupAccountButton = document.querySelector(".profile__edit-button");
// const for closing popup on button (кнока крестик в углу)
const popupList = document.querySelectorAll(".popup");

// function - popup - кнопка Close
function handleCloseByEsc(evt) {
    if (evt.key === "Escape") {
        const popupContainer = document.querySelector(".popup_opened");
        closePopup(popupContainer);
    }
}

// function - popup - Open\Close popup
const openPopup = function(popupContainer) {
    popupContainer.classList.add("popup_opened");
    document.addEventListener("keyup", handleCloseByEsc);
};
const closePOpup = function(popupContainer) {
    popupContainer.classList.remove("popup_opened");
    document.removeEventListener("keyup", handleCloseByEsc);
};

// Open\Close popupElelment
popupList.forEach((popupContainer) => {
    const closePopupButton = popupContainer.querySelector(".popup__close");
    popupContainer.addEventListener("click", function(event) {
        if (event.target === closePopupButton) {
            closePOpup(popupContainer);
        }
    });
});

// section account - Open\Close
openPopupAccountButton.addEventListener("click", function() {
    openPopup(popupAccount);
    nameInput.value = accountName.textContent;
    workInput.value = accountWork.textContent;
});

// section account - Save
function handleFormSubmit(evt) {
    evt.preventDefault();
    accountName.textContent = nameInput.value;
    accountWork.textContent = workInput.value;
    closePOpup(popupAccount);
}

// EventListener - containerAccount for account
containerAccount.addEventListener("submit", handleFormSubmit);

// EventListener - popupElementCardAddButton for image
addPopupElementCardButton.addEventListener("click", function() {
    elementCardInputName.value = "";
    elementCardInputUrl.value = "";
    openPopup(popupElementCard);
});

// function - delete element
function deleteElement(element) {
    element.target.closest(".element").remove();
}

// function - active Like
function handleLikeButton(element) {
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
        openPopup(popupImage);
    });
    elementCard.querySelector(".element__trash").addEventListener("click", deleteElement);
    elementCard.querySelector(".element__button").addEventListener("click", handleLikeButton);
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
inputContainerElement.addEventListener("submit", (element) => {
    element.preventDefault();
    const elementCard = createElement({
        name: elementCardInputName.value,
        link: elementCardInputUrl.value,
    });
    elementsList.prepend(elementCard);
    closePopup(popupElementCard);
});