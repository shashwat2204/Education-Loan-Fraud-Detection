import { createBrowserRouter, Outlet } from "react-router-dom";
import Landingpage from "../Pages/Home/Landingpage";

const PageRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    children: [
       {
        path: "/",
        element: <Landingpage />
       }

    ]
  }])

export default PageRoutes;