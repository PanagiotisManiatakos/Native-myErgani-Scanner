import React, { useState } from "react";
import Authenticate from "./login/Authenticate";
import Login from "./login/Login";

const LoginScreen = () => {
  const [allOk, setAllOk] = useState(false);
  const [login, setLogin] = useState({});

  return (
    <>
      {!allOk && <Login setAllOk={setAllOk} setLogin={setLogin} />}
      {allOk && <Authenticate login={login} />}
    </>
  );
};

export default LoginScreen;
