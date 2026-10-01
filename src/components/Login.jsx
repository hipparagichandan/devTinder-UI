import {useState} from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import {addUser} from "../store/slices/userSlice"
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [emailId,setEmailId] = useState("");
  const [password,setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error,setError] = useState("")
  const[firstName,setFirstName] = useState("")
  const[lastName,setLastName] = useState("")
  const [isSignup, setSignup] = useState(false)

  const handleLoginClick = async () => {
    try{
        setError("")
        const res = await axios.post(BASE_URL + "/login",
        {
          emailId, password
        },{
          withCredentials : true
      })

      dispatch(addUser(res.data))
      navigate("/")
      
    }catch(err){
      setError(err?.response?.data || "something went wrong")
      console.error("ERROR : " + err?.response?.data || "something went wrong")
    }

  }

  const handleSignup = async () => {
    try{
      setError("")
      const res = await axios.post(BASE_URL+ "/signup", {
        firstName,lastName,emailId,password
      },{
        withCredentials : true
      })

      //TODOS  DISPATCH to addUser
      dispatch(addUser(res.data.data))
      console.log("Navigating to profile")
      navigate("/profile")

    }catch(err){
      setError(err?.response?.data || "Something went wrong")
    }
  }

  return (
    <div className='flex justify-center  '>
        <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">{isSignup ? "Login" : "Signup"}</legend>

        {isSignup && <>
          <label className="label">First Name</label>
          <input type="email" className="input" placeholder="first name" value={firstName} onChange={e=> {setFirstName(e.target.value)}}  /> 
                  
          <label className="label">Last Name</label>
          <input type="email" className="input" placeholder="last name" value={lastName} onChange={e=> {setLastName(e.target.value)}}  />
        </>}

        <label className="label">Email</label>
        <input type="email" className="input" placeholder="Email" value={emailId} onChange={e=> {setEmailId(e.target.value)}}  />

        <label className="label">Password</label>
        <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
        <p className='text-red-500'>{error}</p>
        {!isSignup && <>
          <button className="btn btn-neutral mt-4" onClick={handleLoginClick}>Login</button>
          <p className="text-center cursor-pointer" onClick={()=>{setSignup(true)}}>New user? Signup Here</p>
        </>}
        {isSignup && <>
          <button className="btn btn-neutral mt-4" onClick={handleSignup}>Sign Up</button>
          <p className="text-center cursor-pointer" onClick={()=>{setSignup(false)}}>Already a user? Login Here</p>
        </>}
        </fieldset>
    </div>
       
  )
}

export default Login