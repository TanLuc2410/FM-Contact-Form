const formValidation = (() => {
  const form = document.contactForm;

  const notifyFirstNameErrMessage = (firstName) => {
    const fNameErrMessage = document.querySelector(".fName-err-message");
    if (firstName.validity.valueMissing) {
      fNameErrMessage.textContent = `This field is required`;
      firstName.classList.add("error");
    } else {
      fNameErrMessage.textContent = ``;
      firstName.classList.remove("error");
    }
  };
  const notifyLastNameErrMessage = (lastName) => {
    const lNameErrMessage = form.querySelector(".lName-err-message");

    if (lastName.validity.valueMissing) {
      lNameErrMessage.textContent = `This field is required`;
      lastName.classList.add("error");
    } else {
      lNameErrMessage.textContent = ``;
      lastName.classList.remove("error");
    }
  };
  const notifyEmailErr = (email) => {
    const emailErrMessage = form.querySelector(".email-err-message");
    const emailInput = form.querySelector("#email");
    if (email.validity.valueMissing) {
      emailErrMessage.textContent = `This field is required`;
      emailInput.classList.add("error");
    } else if (email.validity.typeMismatch) {
      emailErrMessage.textContent = `Please enter a valid email address`;
      emailInput.classList.add("error");
    } else {
      emailErrMessage.textContent = ``;
      emailInput.classList.remove("error");
    }
  };

  const notifyRadioErrMessage = () => {
    const checkedRadio = form.querySelector('input[name="query"]:checked');
    const queryErrMessage = form.querySelector(".query-err-message");

    if (!checkedRadio) {
      queryErrMessage.textContent = `Please select a query type`;
    } else {
      queryErrMessage.textContent = ``;
    }
  };
  const changeRadioDivColor = () => {
    const checkedRadio = form.querySelector('input[name="query"]:checked');
    if (!checkedRadio) return;

    const nearestDiv = checkedRadio.closest("div");
    const previousChecked = form.querySelector(".colorChecked");

    if (nearestDiv === previousChecked) return;

    if (previousChecked) {
      previousChecked.classList.remove("colorChecked");
    }

    nearestDiv.classList.add("colorChecked");
  };

  const notifyTextareaErrMessage = (message) => {
    const form = document.contactForm;
    const textareaErrMessage = form.querySelector(".textarea-err-message");
    const textareaInput = form.querySelector("#message");
    if (message.validity.valueMissing) {
      textareaErrMessage.textContent = `This field is required`;
      textareaInput.classList.add("error");
    } else {
      textareaErrMessage.textContent = ``;
      textareaInput.classList.remove("error");
    }
  };

  const notifyConsentErrMessage = (checkbox) => {
    const consentErrMessage = form.querySelector(".consent-err-message");
    if (!checkbox.checked) {
      consentErrMessage.textContent = `To submit this form, please consent to being contacted`;
    } else {
      consentErrMessage.textContent = ``;
    }
  };

  const validate = () => {
    const form = document.contactForm;
    const firstName = document.querySelector("#firstName");
    const lastName = form.querySelector("#lastName");
    const email = form.querySelector("#email");
    const checkedRadio = form.querySelector('input[name="query"]:checked');
    const textareaMessage = form.querySelector("#message");
    const consentCheckbox = form.querySelector("#consent");

    if (
      firstName.checkValidity() &&
      lastName.checkValidity() &&
      email.checkValidity() &&
      checkedRadio &&
      textareaMessage.checkValidity() &&
      consentCheckbox.checked
    ) {
      return true;
    }

    if (!firstName.checkValidity()) notifyFirstNameErrMessage(firstName);
    if (!lastName.checkValidity()) notifyLastNameErrMessage(lastName);
    if (!email.checkValidity()) notifyEmailErr(email);
    if (!checkedRadio) notifyRadioErrMessage();
    if (!textareaMessage.checkValidity())
      notifyTextareaErrMessage(textareaMessage);
    if (!consentCheckbox.checked) notifyConsentErrMessage(consentCheckbox);
    return false;
  };

  const slideInAnimation = () => {
    const congrats = document.querySelector(".congrats");
    const alreadyExisted = document.querySelector(".show");

    if (alreadyExisted) {
      //Re-animate
      alreadyExisted.classList.remove("show");
    } else {
      congrats.classList.add("show");
      congrats.focus();
      setTimeout(() => {
        congrats.classList.remove("show");
      }, 4000);
    }
  };

  const submit = () => {
    const form = document.contactForm;
    const validationStatus = validate();
    if (validationStatus) {
      form.reset();
      slideInAnimation();
      form
        .querySelectorAll(".err-message")
        .forEach((el) => (el.textContent = ""));
      form
        .querySelectorAll(".error")
        .forEach((el) => el.classList.remove("error"));
      form.querySelector(".colorChecked")?.classList.remove("colorChecked");

      //add animation here
    }
  };

  const DOMEvents = () => {
    const form = document.contactForm;

    const firstName = document.querySelector("#firstName");

    const lastName = form.querySelector("#lastName");

    const email = form.querySelector("#email");

    const radioButtons = form.querySelectorAll('input[name="query"]');

    const textareaMessage = form.querySelector("textarea");

    const consentCheckbox = form.querySelector("#consent");

    firstName.addEventListener("input", () =>
      notifyFirstNameErrMessage(firstName)
    );
    firstName.addEventListener("blur", () =>
      notifyFirstNameErrMessage(firstName)
    );

    lastName.addEventListener("input", () =>
      notifyLastNameErrMessage(lastName)
    );
    lastName.addEventListener("blur", () => notifyLastNameErrMessage(lastName));

    email.addEventListener("input", () => notifyEmailErr(email));
    email.addEventListener("blur", () => notifyEmailErr(email));

    radioButtons.forEach((radio) => {
      radio.addEventListener("change", () => {
        changeRadioDivColor();
        notifyRadioErrMessage();
      });
    });

    textareaMessage.addEventListener("input", () =>
      notifyTextareaErrMessage(textareaMessage)
    );
    textareaMessage.addEventListener("blur", () =>
      notifyTextareaErrMessage(textareaMessage)
    );

    consentCheckbox.addEventListener("change", () =>
      notifyConsentErrMessage(consentCheckbox)
    );

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      submit();
    });
  };

  const init = () => {
    DOMEvents();
  };

  return { init };
})();

window.addEventListener("DOMContentLoaded", formValidation.init);
