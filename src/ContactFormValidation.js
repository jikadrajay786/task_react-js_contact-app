export const contactFormValidator = (contactFormData, isEditContactFlag) => {
  const errorText = {};

  const nameText = contactFormData.userName;
  const emailText = contactFormData.userEmail;
  const contactText = contactFormData.userContact;

  const nameValid = nameValidator(nameText, errorText);
  const emailValid = emailValidator(emailText, errorText, isEditContactFlag);
  const contactValid = contactValidator(
    contactText,
    errorText,
    isEditContactFlag
  );

  if (nameValid === true && emailValid === true && contactValid === true) {
    return true;
  } else {
    return (false,errorText);
  }
};

const nameValidator = (nameText, Msg) => {
  const nameRegex = /^[a-zA-Z\s]+$/;
  if (nameText.length === "" && nameText === "") {
    Msg.nameError = " Name is required";
    return false;
  } else if (!nameText.match(nameRegex)) {
    Msg.nameError = " Enter valid name";
    return false;
  } else {
    Msg.nameError = "";
  }
  return true;
};

const emailValidator = (emailText, Msg, isEditContactFlag) => {
  const emailReg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (emailText === "" && emailText.length === 0) {
    Msg.emailError = " E-mail is required";
    return false;
  } else if (!emailText.match(emailReg)) {
    Msg.emailError = " Enter valid email";
    return false;
  } else {
    Msg.emailError = "";
  }
  if (isEditContactFlag === false) {
    const getSignUpData = JSON.parse(localStorage.getItem("contactDetail"));
    if (getSignUpData === null) {
    } else {
      for (let i = 0; i < getSignUpData.length; i++) {
        if (getSignUpData[i].userEmail === emailText) {
          Msg.emailError = "This E-mail is already in use";
          return false;
        }
      }
    }
  }
  return true;
};

const contactValidator = (contactText, Msg, isEditContactFlag) => {
  const contactRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  if (contactText === "" && contactText.length === "") {
    Msg.contactError = " Contact is required";
    return false;
  } else if (!contactText.match(contactRegex)) {
    Msg.contactError = " Enter valid contact";
    return false;
  } else {
    Msg.contactError = "";
  }
  if (isEditContactFlag === false) {
    const getSignUpData = JSON.parse(localStorage.getItem("contactDetail"));
    if (getSignUpData === null) {
    } else {
      for (let i = 0; i < getSignUpData.length; i++) {
        if (getSignUpData[i].userContact === contactText) {
          Msg.contactError = "Contact should be unique";
          return false;
        }
      }
    }
  }
  return true;
};
