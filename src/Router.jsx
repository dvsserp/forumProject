import { createBrowserRouter, RouterProvider} from 'react-router-dom';

import App from './App'
import CreatePostPage from './pages/CreatePostPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>
    },
    {
        path: '/create',
        element: <CreatePostPage />
    }
])

const Router = () =>{
    return(
        <RouterProvider router={router}></RouterProvider>
    )
}

export default Router