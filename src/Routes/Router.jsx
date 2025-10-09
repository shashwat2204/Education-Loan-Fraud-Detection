import { createBrowserRouter, Outlet } from "react-router-dom";
import Landingpage from "../Pages/Home/Landingpage";
import AuthPage from "../Pages/Auth/Auth"

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
       }

    ]
  }])

export default PageRoutes;