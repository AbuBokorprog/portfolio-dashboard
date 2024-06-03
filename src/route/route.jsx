import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/main";
import Home from "../pages/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <div>This is error</div>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);
