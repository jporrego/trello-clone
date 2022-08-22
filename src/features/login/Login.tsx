import React from "react";
import { auth, provider } from "../../firebase";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import { setActiveUser, logoutUser, selectUser } from "../user/UserSlice";

const Login = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);

  const handleSignIn = async () => {
    const signInResult = await auth.signInWithPopup(provider);

    if (signInResult !== null) {
      dispatch(
        setActiveUser({
          //@ts-ignore
          name: signInResult.additionalUserInfo?.profile?.given_name,
          //@ts-ignore
          email: signInResult.additionalUserInfo?.profile.email,
          //@ts-ignore
          picture: signInResult.additionalUserInfo?.profile.picture,
        })
      );
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      dispatch(logoutUser());
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
