import React, { useState } from "react";
import { Pencil, Trash } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact, updateContact } from "../reduxToolkit/contactSlice";
import { Button, Modal } from "react-bootstrap";
import { contactFormValidator } from "./../ContactFormValidation";

const ListComp = () => {
  const [contactText, setContactText] = useState({
    userId: "",
    userName: "",
    userEmail: "",
    userContact: "",
    userImage: null,
  });
  const [show, setShow] = useState(false);
  const [errorText, setError] = useState({});
  const [isSubmit, setSubmit] = useState(false);
  const dispatcher = useDispatch();
  const data = useSelector((state) => state.contact.contacts);
  const handleEdit = (id) => {
    const getContactData = data;
    if (getContactData === null) {
    } else {
      for (let i = 0; i < getContactData.length; i++) {
        if (getContactData[i].userId === id) {
          contactText.userId = getContactData[i].userId;
          contactText.userName = getContactData[i].userName;
          contactText.userEmail = getContactData[i].userEmail;
          contactText.userContact = getContactData[i].userContact;
          contactText.userImage = getContactData[i].userImage;
        }
      }
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
    if (window.confirm("Are u sure u want to delete record?")) {
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
      <div className="gridComp" style={{ overflowX: "hidden" }}>
        {data.length === 0 ? (
          <div>There is no record in List</div>
        ) : (
          <div>
            <table id="table-to-xls">
              <thead>
                <tr>
                  <th>SrNo</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Tel</th>
                  <th>Id</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((element, key) => {
                  return (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>{element.userName}</td>
                      <td>{element.userEmail}</td>
                      <td>{element.userContact}</td>
                      <td>{element.userId}</td>
                      <td>
                        <Pencil onClick={() => handleEdit(element.userId)} />{" "}
                        {""}| {""}
                        <Trash onClick={() => handleDelete(element.userId)} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

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
              <span className="sp-error">{errorText.nameError}</span>
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
              <span className="sp-error">{errorText.emailError}</span>
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
              <span className="sp-error">{errorText.contactError}</span>
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
      </div>
    </>
  );
};

export default ListComp;
