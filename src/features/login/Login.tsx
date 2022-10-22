import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";

import { auth, provider } from "../../firebase";
import { setActiveUser, logoutUser, selectUser } from "../user/UserSlice";

import { FaTrello } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import styles from "./Login.module.css";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user.id !== null) {
      navigate("/");
    }
  }, [user]);

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

  return (
    <div className={styles.login}>
      <div className={styles.login_logo}>
        <FaTrello></FaTrello>
        <div>Trello</div>
      </div>
      <h3>Log in to Trello</h3>
      <button onClick={() => dispatch(handleSignIn)}>
        <FcGoogle></FcGoogle>Continue with Google
      </button>
    </div>
  );
};

export default Login;
