import React from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";

import { auth, provider } from "../../firebase";
import { setActiveUser, logoutUser, selectUser } from "../user/UserSlice";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(selectUser);

  const handleSignIn = async () => {
    try {
      const signInResult = await (await auth.signInWithPopup(provider)).user;

      if (signInResult !== null) {
        dispatch(
          setActiveUser({
            //@ts-ignore
            id: signInResult.uid,
            //@ts-ignore
            name: signInResult.displayName,
            //@ts-ignore
            email: signInResult.email,
            //@ts-ignore
            picture: signInResult.photoURL,
          })
        );
      }
      navigate("/");
    } catch (error) {}
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      dispatch(logoutUser());
      localStorage.removeItem("authToken");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      Login{" "}
      {user.name ? (
        <button onClick={handleSignOut}>Sign out</button>
      ) : (
        <button onClick={() => dispatch(handleSignIn)}>Sign in</button>
      )}
    </div>
  );
};

export default Login;
