import React from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import {
  setActiveUser,
  logoutUser,
  selectUser,
} from "../../features/user/UserSlice";
import styles from "./ProfileIcon.module.css";

const ProfileIcon = () => {
  const user = useAppSelector(selectUser);

  const img = user.picture;

  return (
    <div className={styles.profile_icon}>
      {img && <img src={img} alt="" />}
      {user.name}
    </div>
  );
};

export default ProfileIcon;
