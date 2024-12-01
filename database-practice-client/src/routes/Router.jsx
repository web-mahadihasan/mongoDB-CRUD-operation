import { createBrowserRouter } from 'react-router';
import App from '../App.jsx'
import Users from '../Components/Users.jsx';
import ErrorPage from '../Components/ErrorPage.jsx';
import Update from '../Components/Update.jsx';


const Router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/users",
        element: <Users/>,
        loader: () => fetch('http://localhost:5000/users')
    },
    {
        path: "/users/:id",
        element: <Update/>,
        loader: ({params}) => fetch(`http://localhost:5000/users/${params.id}`)
    }
])

export default Router;