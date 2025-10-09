import { createBrowserRouter, Outlet } from "react-router-dom";
import Landingpage from "../Pages/Home/Landingpage";
import AuthPage from "../Pages/Auth/Auth";
import App from "../Pages/Dashboard/dashboardHome";
const PageRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    children: [
       {
        path: "/",
        element: <Landingpage />
       },
       {
        path: "/auth",
        element: <AuthPage />
       },
       {
        path:"/dashboardHome",
        element:<App />
       }

    ]
  }])

export default PageRoutes;