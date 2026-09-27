import {useState} from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import {addUser} from "../store/slices/userSlice"
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [emailId,setEmailId] = useState("chandan@gmail.com");
  const [password,setPassword] = useState("Chandan@123")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error,setError] = useState("")

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

  return (
    <div className='flex justify-center  '>
        <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input type="email" className="input" placeholder="Email" value={emailId} onChange={e=> {setEmailId(e.target.value)}}  />

        <label className="label">Password</label>
        <input type="text" className="input" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
        <p className='text-red-500'>{error}</p>
        <button className="btn btn-neutral mt-4" onClick={handleLoginClick}>Login</button>
        </fieldset>
    </div>
       
  )
}

export default Login