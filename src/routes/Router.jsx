import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../Pages/Home";
import AddModel from "../Pages/AddModel";
import Register from "../components/Register";
import Login from "../components/Login";
import AllModels from "../Pages/AllModels";
import PrivateRoute from "./PrivateRoute";
import ModelDetails from "../Pages/modelDetails";
import UpdateModel from "../Pages/UpdateModel";
import MyModels from "../Pages/MyModels";
import ModelPurchase from "../Pages/ModelPurchase";
import ErrorPage from "../Pages/ErrorPage";
import AboutUs from "../Pages/AboutUs";
import DashboardLayout from "../layout/DashboardLayout/DashboardLayout";
import DashboardOverview from "../layout/DashboardLayout/DashboardOverview";
import Settings from "../layout/DashboardLayout/Settings";
import ContactPage from "../Pages/ContactPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/models",
        element: <AllModels />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/model-details/:id",
        element: <ModelDetails />,
      },
      {
        path: "/update-model/:id",
        element: (
          <PrivateRoute>
            <UpdateModel></UpdateModel>
          </PrivateRoute>
        ),
      },

      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardOverview />,
      },
      {
        path: "add-model",
        element: <AddModel />,
      },
      {
        path: "my-models",
        element: <MyModels />,
      },
      {
        path: "model-purchase-page",
        element: <ModelPurchase />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);
