import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BoardList from "../../features/board/BoardList";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken");

    if (authToken) {
      navigate("/home");
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
