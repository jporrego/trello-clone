import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BoardList from "../../features/board/BoardList";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectUser } from "../../features/user/UserSlice";
import { boardSelected } from "../../features/board/boardsSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user.id === null) {
      navigate("/login");
    }
    dispatch(boardSelected(null));
  }, []);

  return (
    <div>
      <BoardList></BoardList>
    </div>
  );
};

export default Home;
