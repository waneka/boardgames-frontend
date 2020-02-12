import React, { useState } from "react";
import Signup from "../components/Signup";
import Signin from "../components/Signin";
import RequestReset from "../components/RequestReset";

function SigninPage() {
  const [authFlow, setAuthFlow] = useState("SIGNIN");
  return (
    <div>
      {authFlow === "SIGNUP" && <Signup setAuthFlow={setAuthFlow} />}
      {authFlow === "SIGNIN" && <Signin setAuthFlow={setAuthFlow} />}
      {authFlow === "REQUEST_RESET" && (
        <RequestReset setAuthFlow={setAuthFlow} />
      )}
    </div>
  );
}

export default SigninPage;
