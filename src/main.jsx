import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider} from "react-router-dom";
import PageRoutes from './Routes/Router';
import "./index.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={PageRoutes} />
  </StrictMode>,
)