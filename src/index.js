import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import LogIn from "./routes/LogIn";
import SignUp from "./routes/SignUp";
import Profile from "./routes/Profile";
import Kakao from "./routes/Kakao";
import Mypage from "./routes/Mypage";
import { ThemeProvider } from "./ThemeContext";
import NotFound404 from "./routes/NotFound404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound404/>,
  },
  {
    path: "/users",
    element: <Outlet />,
    children: [
      {
        path: "login",
        element: <LogIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "socials/kakao",
        element: <Kakao />,
      },
      {
        path: "mypage",
        element: <Mypage />,
      },
    ],
  },
]);
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);