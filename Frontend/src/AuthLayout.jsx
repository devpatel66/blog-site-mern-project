import {useEffect,useState} from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

function AuthLayout({children,authencation = true}) {
    const [loader,setLoader] = useState(true)
    const navigate = useNavigate()
    const authStatus = useSelector(state => state.status)

    useEffect(()=>{ 
        if(authencation && authStatus != authencation){
            navigate("/login")
        }
        else if(!authencation && authStatus != authencation){
            navigate("/")
        }
        setLoader(false)
    },[loader,navigate,authStatus])

  return (
    loader ? <h1>Loading</h1>: <>{children}</>
  )
}

export default AuthLayout