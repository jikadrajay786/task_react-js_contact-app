import Logo from "./Logo";
import { LoginForm } from "./LoginForm";
import NavBar from "./NavBar";
import { useContext } from "react";
import { authContext } from "./../Context/LoginContext";

const Container = () => {
  const auth = useContext(authContext);
  return (
    <>
      <NavBar btnText={auth.authStatus === true ? "Sign out" : "Sign up"} />
      <Logo />
      <LoginForm />
    </>
  );
};
export default Container;
