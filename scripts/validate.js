// перечень параетров в одном месте
boxForValidation({
    formSelector: ".popup__input-container",
    inputSelector: ".popup__account",
    inputErrorClass: "popup__account_type_active",
    errorClass: "popup__account-error_active",
    submitButtonSelector: ".popup__save",
    inactiveButtonClass: "popup__save_noactive",
});

// show error (оповещение об ошибке)
const showError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    if (errorElement) {
        inputElement.classList.add(config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(config.errorClass);
    }
};

// delete error (удаление оповещения об ошибке)
const notShowError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    if (errorElement) {
        inputElement.classList.remove(config.inputErrorClass);
        errorElement.classList.remove(config.errorClass);
        errorElement.textContent = "";
    }
};

// chech\validate labels (проверка на валидацию полей)
const checkValidity = (formElement, inputElement, config) => {
    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
        notShowError(formElement, inputElement, config);
    }
};

function setButtonSubmit(button, isValid) {
    button.disabled = !isValid;
}
// active\noactive button (активная кнопка или нет)
const switchButtonBehavior = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList, config)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(config.inactiveButtonClass);
    } else {
        buttonElement.removeAttribute("disabled", "disabled");
        buttonElement.classList.remove(config.inactiveButtonClass);
    }
};

// input symbol (ввод символа)
const setEventListeners = (formElement, config) => {
    const inputList = Array.from(
        formElement.querySelectorAll(config.inputSelector) //из .popup__account
    );
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    switchButtonBehavior(inputList, buttonElement, config);
    inputList.forEach((inputElement) => { //обход всех символов
        inputElement.addEventListener("input", () => {
            checkValidity(formElement, inputElement, config);
            switchButtonBehavior(inputList, buttonElement, config);
        });
    });
};

// прием массива полей
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => { //проход массива
        return !inputElement.validity.valid;
    });
};

// прием массива полей
const boxForValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(".popup"));
    formList.forEach((formElement) => { //перебор массива formList
        formElement.addEventListener("submit", function(evt) {
            evt.preventDefault();
        });
        const areaInputList = Array.from(
            formElement.querySelectorAll(config.formSelector)
        );
        areaInputList.forEach((areaInput) => {
            setEventListeners(areaInput, config);
        });
    });
};
