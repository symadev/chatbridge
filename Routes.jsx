import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./src/Component/Home/MainLayout";
import Home from "./src/Component/Section/Home";
import ChatPage from "./src/Component/ChatPages/ChatPage";

 export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children:[
        {
             path: "/",
    element:<Home></Home>,
        },
        {
             path: "/chat",
    element:<ChatPage></ChatPage>,
        }

    ]
  },
]);