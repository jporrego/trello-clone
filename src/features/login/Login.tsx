import React from "react";
import { auth, provider } from "../../firebase";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import { setActiveUser, logoutUser, selectUser } from "../user/UserSlice";

const Login = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const userObject = user.user;

  const handleSignIn = () => {};

  const handleSignOut = () => {};

  return (
    <div>
      Login{" "}
      {userObject ? (
        <button onClick={() => dispatch(handleSignOut)}>Sign out</button>
      ) : (
        <button onClick={() => dispatch(handleSignIn)}>Sign in</button>
      )}
    </div>
  );
};

export default Login;
