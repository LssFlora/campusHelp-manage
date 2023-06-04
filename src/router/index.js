import { Navigate } from "react-router-dom"
import { Suspense } from "react"
import Login from "../pages/Login"
import Home from "../pages/Home"
import UserList from "../pages/UserList"
import AddUser from "../pages/AddUser"
import EmployeeList from "../pages/EmployeeList"
import AddEmployee from "../pages/AddEmployee"
import Post from "../pages/Post"
import FixHall from "../pages/FixHall"
import Sue from "../pages/Sue"



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
                path: "userList",
                element: lazyLoading(<UserList />)
            }, {
                path: "addUser",
                element: lazyLoading(<AddUser />)
            },
            {
                path: "employeeList",
                element: lazyLoading(<EmployeeList />)
            }, {
                path: "addEmployee",
                element: lazyLoading(<AddEmployee />)
            },
            {
                path: "post",
                element: lazyLoading(<Post />)
            },
            {
                path: "fixHall",
                element: lazyLoading(<FixHall />)
            },
            {
                path: "sue",
                element: lazyLoading(<Sue />)
            },
        ]
    },
    {
        path: "*",
        element: <Navigate to="/login" />
    }
]