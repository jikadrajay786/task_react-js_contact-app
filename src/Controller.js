export const uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};
export const crud = (signUpData, isFlag) => {
  let data = signUpData;
  const uniqueId = uuidv4();
  data = Object.assign({ id: uniqueId }, signUpData);
  if (isFlag === false) {
    insertData(data.id, data.name, data.email, data.password);
  } else if (isFlag === true) {
    loginUser(signUpData);

    if (loginUser(signUpData)) {
      return true;
    } else {
      return false;
    }
  } else {
    const data1 = signUpData;
    insertContactData(
      data1.userId,
      data1.userName,
      data1.userEmail,
      data1.userContact,
      data1.userImage
    );
  }
};
const insertData = (id, name, email, pass) => {
  const objData = {
    userId: id,
    userName: name,
    userEmail: email,
    userPassword: pass,
  };
  const dataStorage = JSON.parse(localStorage.getItem("signUp")) || [];
  dataStorage.push(objData);
  localStorage.setItem("signUp", JSON.stringify(dataStorage));
};
const loginUser = (objData) => {
  const getSignUpData = JSON.parse(localStorage.getItem("signUp"));
  if (getSignUpData === null) {
    return false;
  }
  const userExists = getSignUpData.find((element) => 
  
      element.userEmail === objData.email &&
      element.userPassword === objData.password
  
  );
  console.log({userExists});
  return userExists
  // for (let i = 0; i < getSignUpData.length; i++) {
  //   if (
  //     getSignUpData[i].userEmail === objData.email &&
  //     getSignUpData[i].userPassword === objData.password
  //   ) {
  //     return true;
  //   }
  // }
};
const insertContactData = (id, name, email, contact, file) => {
  const objData = {
    userId: id,
    userName: name,
    userEmail: email,
    userContact: contact,
    userImage: file,
  };
  const dataStorage = JSON.parse(localStorage.getItem("contactDetail")) || [];
  dataStorage.push(objData);
  localStorage.setItem("contactDetail", JSON.stringify(dataStorage));
};
