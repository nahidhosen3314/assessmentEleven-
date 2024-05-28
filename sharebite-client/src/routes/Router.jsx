import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AllAvailableFoods from "../pages/AllAvailableFoods";
import AddFood from "../pages/AddFood";
import FoodDetail from "../pages/FoodDetail";
import ManageFood from "../pages/ManageFood";
import UpdateFood from "../pages/UpdateFood";
import PrivateRouter from "./PrivateRouter";
import RequestList from "../pages/RequestList";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
            {
                path: "/foods",
                element: <AllAvailableFoods></AllAvailableFoods>,
            },
            {
                path: "/add-food",
                element: <PrivateRouter><AddFood></AddFood></PrivateRouter>,
            },
            {
                path: "/foods/:id",
                element: <PrivateRouter><FoodDetail></FoodDetail></PrivateRouter>,
            },
            {
                path: "/manage-foods/:id",
                element: <PrivateRouter><ManageFood></ManageFood></PrivateRouter>,
            },
            {
                path: "/update-foods/:id",
                element: <PrivateRouter><UpdateFood></UpdateFood></PrivateRouter>,
            },
            {
                path: "/requested-foods/:id",
                element: <PrivateRouter><RequestList></RequestList></PrivateRouter>,
            },
        ],
    },
]);

export default router;