import Input from '../tags/input'
import {NavLink} from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import userAuth from '../Api/userApi'

function Login() {
  const formRef = useRef(null)
  const [errorMsg,setError] = useState(null)
  const [errorPwdMsg,setPwdError] = useState(null)

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {
      email : String(formData.get("email")),
      password : String(formData.get("password"))
    }

    const response = await userAuth.login(data)
    if(response.statusCode == 401) {
      setError(response.message)
    }
    else if(response.statusCode == 403) {
      setPwdError("* "+response.message)
    }
    console.log(response);
  }

  useEffect(()=>{
    if(errorMsg){
      setTimeout(()=>{
        setError(null)
      },3000)
    }
  },[errorMsg])
  
  // console.log(formRef);
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-6">
        <h2 className="text-center text-l bg-red-200 font-bold leading-9 tracking-tight text-red-600">{errorMsg}</h2>
      </div>
      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" ref={formRef}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div className="mt-2">
              <Input id="email" name="email" type="email"/>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              
            </div>
            <div className="mt-2">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <h2 className={`text-left text-l font-bold leading-9 tracking-tight text-red-600 ${errorPwdMsg ? "block" : "hidden"}`}>{errorPwdMsg}</h2>
              <Input id="password" name="password" type="password"/>
            </div>
          </div>

          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={(e)=>handleSubmit(e)}>Sign in</button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <NavLink className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" to={"/register"}>Register Here</NavLink>
          
          <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"></a>
        </p>
      </div>
    </div>
  )
}

export default Login