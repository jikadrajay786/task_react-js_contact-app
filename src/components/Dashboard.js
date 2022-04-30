import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "./../Context/LoginContext";
import NavBar from "./NavBar";
import DashboardDetail from "./DashboardDetail";

const Dashboard = () => {
  const navigate = useNavigate();
  const auth = useContext(authContext);
  const loggedInData = JSON.parse(localStorage.getItem("loggedData"));
  var name;

  useEffect(() => {
    if (loggedInData === null) {
      navigate("/login");
    }
  }, [loggedInData, navigate]);

  if (loggedInData) {
    const getSignUpData = JSON.parse(localStorage.getItem("signUp"));
    if (getSignUpData) {
      getSignUpData.forEach((element) => {
        if (element.userEmail === loggedInData.email) {
          name = element.userName;
        }
      });
    }
  }
  return (
    <>
      <NavBar btnText={auth.authStatus === true ? "Sign out" : "Sign up"} />
      <div>
        <div className="txt-welcome">
          <h4>Welcome {name}</h4>
        </div>
        <DashboardDetail />
      </div>
    </>
  );
};

export default Dashboard;
