import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import ProfilePopover from "./profile_popover/ProfilePopover";
import { FaUserCircle } from "react-icons/fa";

import {
  setActiveUser,
  logoutUser,
  selectUser,
} from "../../features/user/UserSlice";
import styles from "./ProfileIcon.module.css";

const ProfileIcon = () => {
  const user = useAppSelector(selectUser);
  const [showListMenu, setShowListMenu] = useState<boolean>(false);

  const img = user.picture;

  return (
    <div className={styles.profile_icon}>
      {img ? (
        <div>
          <ProfilePopover
            setShowListMenu={setShowListMenu}
            img={img}
          ></ProfilePopover>
        </div>
      ) : (
        <FaUserCircle></FaUserCircle>
      )}
    </div>
  );
};

export default ProfileIcon;
