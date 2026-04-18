import MyAbout from "../pages/about/MyAbout";
import MyError from "../pages/MyError";

import MyFront from "../pages/front/MyFront";
import MyPortfolio from "../pages/portfolio/MyPortfolio";
import MyPrices from "../pages/prices/MyPrices";
// import MyIdGallery from "../pages/MyIdGallery";
import AdminAbout from "../pages/adminAbout/AdminAbout";
import AdminFront from "../pages/adminFront/AdminFront";
import AdminPortfolio from "../pages/adminPortfolio/AdminPortfolio";
import AdminPrices from "../pages/adminPrices/AdminPrices";

export const publicRoutes = [
  { path: "/", component: MyFront },
  { path: "portfolio", component: MyPortfolio },
  // { path: "/:id", component: MyIdGallery },
  { path: "about", component: MyAbout },
  { path: "prices", component: MyPrices },

  { path: "/*", component: MyError },
];

export const adminRoutes = [
  { path: "/admin", component: AdminFront },
  { path: "/admin/portfolio", component: AdminPortfolio },
  { path: "/admin/prices", component: AdminPrices },
  { path: "/admin/about", component: AdminAbout },
];
