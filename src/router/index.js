import { Navigate } from "react-router-dom"
import { Suspense } from "react"
import Login from "../pages/Login"
import Home from "../pages/Home"
import MainList from "../pages/MainList"
import AddRole from "../pages/AddRole"




const lazyLoading = (com) => {
    return (
        <Suspense fallback={<div>Loading</div>}>
            {com}
        </Suspense>
    )
}


export default [
    {
        path: "/",
        element: <Navigate to="/login" />
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/home",
        element: <Home />,
        children: [
            {
                path: "roleOverView",
                element: <MainList />
            }, {
                path: "addRole",
                element: <AddRole />
            }
        ]
    },
    {
        path: "*",
        element: <Navigate to="/login" />
    }
]