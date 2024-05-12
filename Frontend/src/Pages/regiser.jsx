import Input from '../tags/input'
import { NavLink } from 'react-router-dom'
import { useRef, useState } from 'react'
import userAuth from '../Api/userApi'

function Register() {
  const formRef = useRef(null)
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");
  const [fullnameError, setFullnameError] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {
      fullname: formData.get("fullname"),
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password")
    }
    let response = await userAuth.RegisterUser(data)

    if (response.statusCode == 405) {
      setUsernameError(response.message)
    }
    else if (response.statusCode == 400) {
      setEmailError(response.message)
    }
    else if (response.statusCode == 403) {
      setPasswordError(response.message)
    }
    else if (response.statusCode == 500) {
      setServerError(response.message)
    }
    else if (response.statusCode == 404) {
      setFullnameError(response.message)
    }



    console.log(response);
  }
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up to your account</h2>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-6">
        <h2 className="text-center text-l bg-red-200 font-bold leading-9 tracking-tight text-red-600">{serverError}</h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" ref={formRef}>

          <div>
            <label htmlFor="Fullname" className="block text-sm font-medium leading-6 text-gray-900">Fullname</label>
            <div className="mt-2">
              <h2 className={`text-left text-l font-bold leading-9 tracking-tight text-red-600 ${fullnameError ? "block" : "hidden"}`}>{fullnameError}</h2>
              <Input id="name" name="fullname" />
            </div>
          </div>

          <div>
            <label htmlFor="UserName" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
            <div className="mt-2">
              <h2 className={`text-left text-l font-bold leading-9 tracking-tight text-red-600 ${usernameError ? "block" : "hidden"}`}>{usernameError}</h2>
              <Input id="username" name="username" />
            </div>
          </div>

          <div>
            <label htmlFor="Email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div className="mt-2">
              <h2 className={`text-left text-l font-bold leading-9 tracking-tight text-red-600 ${emailError ? "block" : "hidden"}`}>{emailError}</h2>
              <Input id="email" name="email" type='email' />
            </div>
          </div>

          <div>
            <label htmlFor="Password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div className="mt-2">
              <h2 className={`text-left text-l font-bold leading-9 tracking-tight text-red-600 ${passwordError ? "block" : "hidden"}`}>{passwordError}</h2>
              <Input id="password" name="password" type='password' />
            </div>
          </div>

          <div className='flex justify-center'>
            <button onClick={(e) => handleSubmit(e)} type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 w-fit px-4 py-2 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ">Sign Up</button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a member?
          <NavLink className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" to={"/login"}>Login Here</NavLink>

          <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"></a>
        </p>
      </div>
    </div>
  )
}

export default Register