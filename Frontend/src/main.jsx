import ReactDOM from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import './index.css'
import {Login, Register} from './Pages/index.js'
import App from './App.jsx'
import {Provider} from 'react-redux'
import store from './store/store.js'
import AuthLayout from './AuthLayout.jsx'
import AddPost from './Pages/AddPost.jsx'

const router = createBrowserRouter([{
  path : "/",
  element : <App/>,
  children : [{
    path : "login",
    element : (
    <AuthLayout authencation={false}>
      <Login/>
    </AuthLayout>
    )
  },
  {
    path : "register",
    element : (
      <AuthLayout authencation={false}>
        <Register/>
      </AuthLayout>
      )
  },
  {
    path : "addpost",
    element : (
      <AuthLayout authencation={false}>
        <AddPost/>
      </AuthLayout>
      )
  }]
}])
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
)
