export const validator = (formData, isFlag) => {
  const errors = {};
  if (isFlag === true) {
    const formEmailValid = emailValidator(formData.email, errors);
    const formPasswordValid = passwordValidator(formData.password, errors);
    if (formEmailValid === true && formPasswordValid === true) {
      return true;
    } else {
      return (false, errors);
    }
  }

  if (isFlag === false) {
    const modelNameValid = nameValidator(formData.name, errors);
    const modelEmailValid = emailValidator(formData.email, errors, isFlag);
    const modelPasswordValid = passwordValidator(formData.password, errors);
    const modelConfirmPasswordValid = confirmPassValidator(
      formData.password,
      formData.confirmPass,
      errors
    );

    if (
      modelNameValid === true &&
      modelEmailValid === true &&
      modelPasswordValid === true &&
      modelConfirmPasswordValid === true
    ) {
      return true;
    } else {
      return (false, errors);
    }
  }

  return false;
};

const nameValidator = (nameText, Msg) => {
  const nameRegex = /^[a-zA-Z\s]+$/;
  if (nameText === "" && nameText.length === "") {
    Msg.nameError = " Name required";
    return false;
  } else if (!nameText.match(nameRegex)) {
    Msg.nameError = " Enter valid name";
    return false;
  } else {
    Msg.nameError = "";
  }
  return true;
};

const emailValidator = (emailText, Msg, isFlag) => {
  const emailReg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (emailText === "" && emailText.length === 0) {
    Msg.emailError = " E-mail required";
    return false;
  } else if (!emailText.match(emailReg)) {
    Msg.emailError = " Enter valid email";
    return false;
  } else {
    Msg.emailError = "";
  }
  if (isFlag === false) {
    const getSignUpData = JSON.parse(localStorage.getItem("signUp"));
    if (getSignUpData === null) {
    } else {
      getSignUpData.forEach((element) => {
        if (element.userEmail === emailText) {
          Msg.emailError = "This E-mail is already in use";
          return false;
        }
      });
    }
  }
  return true;
};

const passwordValidator = (passwordText, Msg) => {
  const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (passwordText === "" && passwordText.length === 0) {
    Msg.passwordError = " Password required";
    return false;
  } else if (!passwordText.match(passwordReg)) {
    Msg.passwordError =
      "Minimum eight characters, at least one letter and one number";
    return false;
  } else {
    Msg.passwordError = "";
  }
  return true;
};

const confirmPassValidator = (passText, conPassText, Msg) => {
  if (conPassText === "") {
    Msg.confirmPasswordError = " Confirm password required";
    return false;
  } else if (passText !== conPassText) {
    Msg.confirmPasswordError = " Confirm password not match";
    return false;
  } else {
    Msg.confirmPasswordError = "";
  }

  return true;
};
