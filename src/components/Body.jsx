import { useEffect } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../store/slices/userSlice'
import axios from 'axios'

const Body = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const userData = useSelector(store => store.user)

 
  
  useEffect(()=> {
    let isMounted = true;
  const isLoginPage = location.pathname === '/login'

    async function fetchUser() {
      try{
        const res = await axios.get(BASE_URL+"/profile/view", 
          {
            withCredentials : true
          }
        )

        if(isMounted){
          dispatch(addUser(res.data))
          // If they successfully fetched data while sitting on /login, kick them out to feed
          if (isLoginPage) {
            navigate("/");
          }
        }

      }catch(err){
        if(err.response?.status === 401 && !isLoginPage){
           navigate("/login")
        }
      console.error("ERROR : " + err?.response?.data || "something went wrong")
      }
    }

    if(userData && isLoginPage){
      navigate("/")
    }

    if(!userData){
      fetchUser()
    }

    return ()=>{
      isMounted = false;
    }
    
  }, [userData,dispatch,navigate,location.pathname])

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />

    </div>
  )
}

export default Body