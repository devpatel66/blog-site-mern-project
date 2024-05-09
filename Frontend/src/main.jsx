import ReactDOM from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import './index.css'
import {Login, Register} from './Pages/index.js'
import App from './App.jsx'

const router = createBrowserRouter([{
  path : "/",
  element : <App/>,
  children : [{
    path : "login",
    element : <Login/>
  },
  {
    path : "register",
    element : <Register/>
  }]
}])
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
