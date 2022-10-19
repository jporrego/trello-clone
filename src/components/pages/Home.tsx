import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BoardList from "../../features/board/BoardList";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigate("/");
    }

    if (!authToken) {
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
