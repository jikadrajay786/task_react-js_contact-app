import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Modal, Tab, Tabs } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { contactFormValidator } from "./../ContactFormValidation";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../reduxToolkit/contactSlice";
import { CSVLink } from "react-csv";
import { crud, uuidv4 } from "./../Controller";
import { useCSVReader } from "react-papaparse";

const DashboardDetail = () => {
  let isEditContactFlag = true;
  const { CSVReader } = useCSVReader();
  const contactData = useSelector((state) => state.contact.contacts);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [text, setText] = useState({
    userName: "",
    userEmail: "",
    userContact: "",
    userImage: null,
  });
  const [show, setShow] = useState(false);
  const [key, setKey] = useState("Grid");
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
      setText({ ...text, userImage: base64 });
    });
  };
  const handleSelect = (key) => {
    navigate("/dashboard/" + key);
    setKey(key);
  };
  const handleModel = () => {
    setShow(true);
  };
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("contactDetail"));
    const req = { data: data, type: "localStorage" };
    !contactData.length ? dispatch(addContact(req)) : console.log("first");
  }, [dispatch, contactData]);
  const handleSave = () => {
    isEditContactFlag = false;
    let data = {};
    const uniqueId = uuidv4();
    data = { userId: uniqueId, ...text };
    setError(contactFormValidator(text, isEditContactFlag));
    if (contactFormValidator(text, isEditContactFlag) === true) {
      crud(data);
      dispatch(addContact({ data: data }));
      setShow(false);
      setText({
        userName: "",
        userEmail: "",
        userContact: "",
        userImage: null,
      });
    }
    return setSubmit(true);
  };
  useEffect(() => {
    if (!show) {
      setSubmit(false);
    }
  }, [show]);
  const onKeyUpHandler = () => {
    isEditContactFlag = false;
    if (isSubmit === true) {
      setError(contactFormValidator(text, isEditContactFlag));
    }
  };
  const handleOnFileUpload = (results) => {
    const csvHeader = results.data[0];
    const len = results.data.length;
    let csvRow = [];
    let newObj = [];

    for (let i = 1; i < len; i++) {
      csvRow.push(results.data[i]);
    }
    csvRow.forEach((Element, indexes) => {
      let obj = {};
      Element.forEach((item, index) => {
        obj[csvHeader[index]] = item;
      });
      newObj.push(obj);
    }, {});

    if (newObj !== null && newObj.length !== 0) {
      function comparer(otherArray) {
        return function (current) {
          return (
            otherArray.filter(function (other) {
              return (
                other.userId === current.userId ||
                other.userEmail === current.userEmail ||
                other.userContact === current.userContact
              );
            }).length === 0
          );
        };
      }
      const conData = JSON.parse(localStorage.getItem("contactDetail"));
      if (conData) {
        var onlyInB = newObj.filter(comparer(conData));
        if (onlyInB && onlyInB.length) {
          
          onlyInB.forEach((el) => {
            crud(el);
          });
          const importData = { data: onlyInB, type: "import" };
          dispatch(addContact(importData));
        }
      } else {
        newObj.forEach((el) => {
          crud(el);
        });
        const importData = { data: newObj, type: "import" };
        dispatch(addContact(importData));
      }
    } else {
      alert("this file is null!");
    }
  };
  return (
    <>
      <div style={{ padding: "0.5em" }}>
        <div className="dashContainer">
          <div className="dashHeader">Employee</div>
          <div className="header-container">
            <div>
              <CSVReader
                onUploadAccepted={(results) => {
                  handleOnFileUpload(results);
                }}
                noDrag
              >
                {({ getRootProps, acceptedFile }) => (
                  <>
                    <div {...getRootProps()}>
                      {acceptedFile ? (
                        <>
                          <button
                            style={{ color: "white" }}
                            className="btn btn-info btn-sm"
                          >
                            Import
                          </button>
                        </>
                      ) : (
                        <button
                          style={{ color: "white" }}
                          className="btn btn-info btn-sm"
                        >
                          Import
                        </button>
                      )}
                    </div>
                  </>
                )}
              </CSVReader>
            </div>
            <CSVLink
              style={{ color: "white" }}
              className="btn btn-info btn-sm"
              data={contactData}
            >
              Export
            </CSVLink>
            <Plus onClick={handleModel} size={40} />
          </div>

          <div style={{ padding: "1em" }}>
            <Modal show={show}>
              <Modal.Header>
                <Modal.Title>Add Contact</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full name"
                    style={{ marginTop: "1em" }}
                    value={text.name}
                    onChange={(e) =>
                      setText({ ...text, userName: e.target.value })
                    }
                    onKeyUp={onKeyUpHandler}
                  />
                  <span className="sp-error">{error.nameError}</span>
                  <br />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email Id"
                    value={text.email}
                    onChange={(e) =>
                      setText({ ...text, userEmail: e.target.value })
                    }
                    onKeyUp={onKeyUpHandler}
                  />
                  <span className="sp-error">{error.emailError}</span>
                  <br />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Contact no"
                    value={text.contact}
                    onChange={(e) =>
                      setText({ ...text, userContact: e.target.value })
                    }
                    onKeyUp={onKeyUpHandler}
                  />
                  <span className="sp-error">{error.contactError}</span>
                  <input
                    type="file"
                    className="form-control"
                    style={{ marginTop: "1em" }}
                    onChange={fileHandler}
                    onKeyUp={onKeyUpHandler}
                  />
                  <span className="sp-error">{error.fileError}</span>
                </div>
              </Modal.Body>

              <Modal.Footer>
                <Button
                  style={{ color: "white", backgroundColor: "#337ab7" }}
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
            <Tabs activeKey={key} onSelect={handleSelect} className="mb-3 xy">
              <Tab eventKey="Grid" title="Grid">
                <Outlet />
              </Tab>
              <Tab eventKey="List" title="List">
                <Outlet />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardDetail;
