import { Routes, Route } from "react-router-dom";
import { publicRoutes, adminRoutes } from "../router/route";
import PageTransition from "./PageTransition";
import SidebarAdmin from "./UI/sidebarAdmin/SidebarAdmin";

const AppAdminRouter = () => {
  return (
    <>
      <SidebarAdmin />
      <div style={{ marginLeft: "220px" }}>
        <Routes>
          {adminRoutes.map((route) => (
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
        </Routes>
      </div>
    </>
  );
};

export default AppAdminRouter;
