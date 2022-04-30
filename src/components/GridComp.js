import React, { useState } from "react";
import { Pencil, Trash } from "react-bootstrap-icons";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { deleteContact, updateContact } from "../reduxToolkit/contactSlice";
import { contactFormValidator } from "./../ContactFormValidation";

const GridComp = () => {
  let [contactText, setContactText] = useState({
    userId: "",
    userName: "",
    userEmail: "",
    userContact: "",
    userImage: null,
  });
  const data = useSelector((state) => state.contact.contacts);
  const dispatcher = useDispatch();
  const [show, setShow] = useState(false);
  const [error, setError] = useState({});
  const [isSubmit, setSubmit] = useState(false);
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };
  const fileHandler = (e) => {
    const fileText = e.target.files[0];
    getBase64(fileText).then((base64) => {
      setContactText({ ...contactText, userImage: base64 });
    });
  };
  const handleEdit = (id) => {
    const getContactData = data;
    if (getContactData === null) {
    } else {
      getContactData.forEach((element) => {
        console.log(element);
        if (getContactData.userId === id) {
          contactText.userId = element.userId;
          contactText.userName = element.userName;
          contactText.userEmail = element.userEmail;
          contactText.userContact = element.userContact;
          contactText.userImage = element.userImage;
        }
      });
    }
    setShow(true);
  };
  const handleSave = () => {
    setError(contactFormValidator(contactText));
    if (contactFormValidator(contactText) === true) {
      const getContactData = JSON.parse(localStorage.getItem("contactDetail"));
      const index = getContactData.findIndex(
        (obj) => obj.userId === contactText.userId
      );
      if (index < 0) {
      } else {
        getContactData.splice(index, 1, contactText);
        localStorage.setItem("contactDetail", JSON.stringify(getContactData));
        setShow(false);
        setContactText({
          userId: "",
          userName: "",
          userEmail: "",
          userContact: "",
          userImage: null,
        });
        dispatcher(
          updateContact({ id: contactText.userId, data: contactText })
        );
      }
    }
    return setSubmit(true);
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete record?")) {
      const getContactData = JSON.parse(localStorage.getItem("contactDetail"));
      if (getContactData === null) {
      } else {
        getContactData.forEach((element, i) => {
          if (element.userId === id) {
            getContactData.splice(i, 1);
          }
        });
        localStorage.setItem("contactDetail", JSON.stringify(getContactData));
        dispatcher(deleteContact(id));
      }
    }
  };
  const onKeyUpHandler = () => {
    if (isSubmit === true) {
      setError(contactFormValidator(contactText));
    }
  };
  return (
    <>
      <div className="gridComp">
        <div className="flex-container ">
          {data.length === 0 ? (
            <div>There is no record in grid</div>
          ) : (
            data.map((element, key) => {
              return (
                <div className="card" key={key}>
                  <div>
                    <img
                      className="imgContent"
                      src={element.userImage}
                      alt=""
                    />
                  </div>
                  <div className="container">
                    <span
                      style={{
                        color: "rgb(51 51 51)",
                        fontSize: "18px",
                        fontWeight: "500",
                      }}
                    >
                      {element.userName}
                    </span>
                    <br />
                    <p
                      style={{
                        color: "rgb(51 51 51)",
                        fontSize: "14px",
                        margin: "5px",
                      }}
                    >
                      {element.userEmail}
                    </p>

                    <p style={{ marginBottom: "10px" }}>
                      {element.userContact}
                    </p>
                    <div
                      style={{
                        marginBottom: "10px",
                        padding: "5px",
                        alignContent: "center",
                      }}
                    >
                      <span style={{ marginRight: "6px" }}>
                        <Pencil
                          onClick={() => {
                            handleEdit(element.userId);
                          }}
                        />
                        <Modal show={show}>
                          <Modal.Header>
                            <Modal.Title>Edit Contact</Modal.Title>
                          </Modal.Header>

                          <Modal.Body>
                            <div>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Full name"
                                style={{ marginTop: "1em" }}
                                value={contactText.userName}
                                onChange={(e) =>
                                  setContactText({
                                    ...contactText,
                                    userName: e.target.value,
                                  })
                                }
                                onKeyUp={onKeyUpHandler}
                              />
                              <span className="sp-error">
                                {error.nameError}
                              </span>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Email Id"
                                value={contactText.userEmail}
                                onChange={(e) =>
                                  setContactText({
                                    ...contactText,
                                    userEmail: e.target.value,
                                  })
                                }
                                onKeyUp={onKeyUpHandler}
                              />
                              <span className="sp-error">
                                {error.emailError}
                              </span>
                              <br />
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Contact no"
                                value={contactText.userContact}
                                onChange={(e) =>
                                  setContactText({
                                    ...contactText,
                                    userContact: e.target.value,
                                  })
                                }
                                onKeyUp={onKeyUpHandler}
                              />
                              <span className="sp-error">
                                {error.contactError}
                              </span>
                              <input
                                type="file"
                                className="form-control"
                                style={{ marginTop: "1em" }}
                                onChange={fileHandler}
                                onKeyUp={onKeyUpHandler}
                              />
                              <div className="imgPreView">
                                <img
                                  className="imgContent"
                                  src={contactText.userImage}
                                  alt=""
                                />
                              </div>
                            </div>
                          </Modal.Body>

                          <Modal.Footer>
                            <Button
                              style={{
                                color: "white",
                                backgroundColor: "#337ab7",
                              }}
                              variant="primary"
                              onClick={handleSave}
                            >
                              Save
                            </Button>

                            <Button
                              style={{ color: "white" }}
                              variant="warning"
                              onClick={() => {
                                setShow(false);
                              }}
                            >
                              Cancel
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </span>

                      <span>
                        <Trash onClick={() => handleDelete(element.userId)} />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default GridComp;
