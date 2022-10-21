import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BoardList from "../../features/board/BoardList";

import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/user/UserSlice";

const Home = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user.id === null) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <BoardList></BoardList>
    </div>
  );
};

export default Home;
