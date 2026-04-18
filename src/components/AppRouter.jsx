import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { publicRoutes, adminRoutes } from "../router/route";
import { useDispatch, useSelector } from "react-redux";
import PageTransition from "./PageTransition";
import MyNavbar from "./UI/navbar/MyNavbar";
import SidebarAdmin from "./UI/sidebarAdmin/SidebarAdmin";
import MyLog from "../pages/login/MyLog";
import { useEffect, useRef } from "react";
import { getDir } from "../API/dir";
import MyCase from "../pages/case/MyCase";
import FloatButtonPortal from "./UI/floatButtonPortal/FloatButtonPortal";
import { useScrollbarAwareWidth } from "../hook/useScrollbarAwareWidth";

const AppRouter = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  const isAuth = useSelector((state) => state.user.isAuth);

  const wrapperRef = useRef(null);

  useEffect(() => {
    dispatch(getDir());
  }, []);

  useEffect(() => {
    console.log("MyCase mounted");
  }, []);

  const dirs = useSelector((state) => {
    return state.dirs.dirs;
  });

  const containerWidthWidget = useScrollbarAwareWidth(wrapperRef);

  return (
    <>
      {!isAdminPage && <MyNavbar />}
      {isAdminPage && <SidebarAdmin />}

      <Routes>
        <Route
          path="/case/:id"
          element={
            <PageTransition>
              <MyCase />
            </PageTransition>
          }
        />
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <PageTransition>
                <route.component />
              </PageTransition>
            }
          />
        ))}
        {!isAuth ? (
          <Route
            key="/login"
            path="/login"
            element={
              <PageTransition>
                <MyLog />
              </PageTransition>
            }
          />
        ) : (
          <Route
            key="/login"
            path="/login"
            element={
              <PageTransition>
                <Navigate to="/" />
              </PageTransition>
            }
          />
        )}
        {isAuth ? (
          adminRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <div style={{ marginLeft: "200px" }}>
                  <PageTransition>
                    <route.component />
                  </PageTransition>
                </div>
              }
            />
          ))
        ) : (
          <Route
            key="/admin/*"
            path="/admin/*"
            element={
              <PageTransition>
                <Navigate to="/login" />
              </PageTransition>
            }
          />
        )}
      </Routes>

      <FloatButtonPortal />
    </>
  );
};

export default AppRouter;
