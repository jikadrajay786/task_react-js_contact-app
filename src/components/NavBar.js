import React from "react";
import { useState, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { validator } from "./../Validation";
import { crud } from "./../Controller";
import { authContext } from "./../Context/LoginContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
toast.configure();

const NavBar = (props) => {
  let isModelFlag = true;
  const auth = useContext(authContext);
  const navigate = useNavigate();
  const [text, setText] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
  });
  const [errorText, setError] = useState({});
  const [isSubmit, setSubmit] = useState(false);
  const [show, setShow] = useState(false);

  const handleModelClose = () => {
    setShow(false);
    setError(false)
  };
  const handleShow = () => {
    auth.authStatus !== true ? setShow(true) : setShow(false);
  };

  const manageSignOut = () => {
    auth.setAuthStatus(false);
    toast.success("Sign Out Successfully", {
      theme: "colored",
      icon: "✓",
    });
    navigate("/login");
    localStorage.removeItem("loggedData");
  };
  const handleSignUp = () => {
    isModelFlag = false;
    setError(validator(text, isModelFlag));
    if (validator(text, isModelFlag) === true) {
      crud(text, isModelFlag);
      text.name = "";
      text.email = "";
      text.password = "";
      text.confirmPass = "";
      setShow(false);
    }
    return setSubmit(true);
  };

  const onKeyUpHandler = () => {
    isModelFlag = false;
    if (isSubmit === true) {
      setError(validator(text, isModelFlag));
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="navHeader">
            <span className="headerSpan">
              React - Bootstrap <span className="subHeaderSpan">App</span>
            </span>
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-primary navButton"
              onClick={auth.authStatus === true ? manageSignOut : handleShow}
            >
              {props.btnText}
            </button>
          </div>
        </div>
      </nav>

      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            <input
              type="text"
              className="form-control"
              placeholder="Full name"
              onChange={(e) => setText({ ...text, name: e.target.value })}
              onKeyUp={onKeyUpHandler}
              style={{ marginTop: "1em" }}
            />
            <span
              style={{
                color: "red",
                display: "inline-block",
                paddingBottom: "15px",
              }}
            >
              {errorText.nameError}
            </span>
            <br />
            <input
              type="text"
              className="form-control"
              placeholder="Email Id"
              onChange={(e) => setText({ ...text, email: e.target.value })}
              onKeyUp={onKeyUpHandler}
            />
            <span
              style={{
                color: "red",
                display: "inline-block",
                paddingBottom: "15px",
              }}
            >
              {errorText.emailError}
            </span>
            <br />
            <input
              type="text"
              className="form-control"
              placeholder="Password"
              onChange={(e) => setText({ ...text, password: e.target.value })}
              onKeyUp={onKeyUpHandler}
            />
            <span
              style={{
                color: "red",
                display: "inline-block",
                paddingBottom: "15px",
              }}
            >
              {errorText.passwordError}
            </span>
            <br />
            <input
              type="text"
              className="form-control"
              placeholder="Confirm password"
              onChange={(e) =>
                setText({ ...text, confirmPass: e.target.value })
              }
              onKeyUp={onKeyUpHandler}
            />
            <span
              style={{
                color: "red",
                display: "inline-block",
                paddingBottom: "15px",
              }}
            >
              {errorText.confirmPasswordError}
            </span>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            style={{ color: "white", backgroundColor: "#337ab7" }}
            variant="primary"
            onClick={handleSignUp}
          >
            Sign Up
          </Button>

          <Button
            style={{ color: "white" }}
            variant="warning"
            onClick={handleModelClose}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NavBar;
