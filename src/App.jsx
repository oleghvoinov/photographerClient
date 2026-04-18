import React, { useEffect } from "react";
import "./style/main.scss";
import { BrowserRouter, useLocation } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./API/user";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);

  useEffect(() => {
    if (isAuth) {
      dispatch(auth());
    }
  }, [dispatch]);
  return (
    <div>
      <BrowserRouter>
        <AppRouter />

        {/* <AppAdminRouter /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
