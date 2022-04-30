import React, { useContext } from "react";
import { useState } from "react";
import { validator } from "./../Validation";
import { crud } from "./../Controller";
import { authContext } from "./../Context/LoginContext";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export const LoginForm = () => {
  let isLoginFlag = false;
  const navigate = useNavigate();

  const auth = useContext(authContext);
  const [text, setText] = useState({ email: "", password: "" });
  const [errorText, setError] = useState({});
  const [isSubmit, setSubmit] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    isLoginFlag = true;
    setError(validator(text, isLoginFlag));

    if (validator(text, isLoginFlag) === true) {
      crud(text, isLoginFlag);
      if (crud(text, isLoginFlag) === true) {
        localStorage.setItem("loggedData", JSON.stringify(text));
        auth.setAuthStatus(true);
        navigate("/dashboard");
        toast.success("Login Success!", {
          theme: "colored",
          icon: "✓",
        });
      } else {
        toast.error("login Failed", {
          theme: "colored",
        });
      }
    }
    return setSubmit(true);
  };

  const onKeyUpHandler = () => {
    isLoginFlag = true;
    if (isSubmit === true) {
      setError(validator(text, isLoginFlag));
    }
  };

  return (
    <>
      <div className="ng-scope formContainer">
        <div className="formBorder">
          <div style={{ margin: "15px" }}>
            <span style={{ fontSize: "24px" }}>Login</span>
          </div>

          <hr></hr>

          <form onSubmit={submitHandler}>
            <div style={{ margin: "10px 15px 40px 15px" }}>
              <input
                type="text"
                autoComplete="true"
                className="form-control"
                placeholder="Email Id"
                value={text.email}
                onChange={(e) => setText({ ...text, email: e.target.value })}
                onKeyUp={onKeyUpHandler}
              />

              <span style={{ color: "red" }}>{errorText.emailError}</span>
              <br />
              <input
                type="text"
                autoComplete="true"
                className="form-control"
                placeholder="Password"
                value={text.password}
                onChange={(e) => setText({ ...text, password: e.target.value })}
                onKeyUp={onKeyUpHandler}
              />
              <span style={{ color: "red" }}>{errorText.passwordError}</span>
            </div>
            <hr></hr>
            <div>
              <Button type="submit" className="btn btn-primary sbtButton">
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
