import {useState} from 'react'
import axios from 'axios'

const Login = () => {
  const [emailId,setEmailId] = useState("chandan@gmail.com");
  const [password,setPassword] = useState("Chandan@123")

  const handleLoginClick = async () => {

   const res = await axios.post("http://localhost:7777/login",
    {emailId, password},{
      withCredentials : true
    })


  }

  return (
    <div className='flex justify-center  '>
        <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input type="email" className="input" placeholder="Email" value={emailId} onChange={e=> {setEmailId(e.target.value)}}  />

        <label className="label">Password</label>
        <input type="text" className="input" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}} />

        <button className="btn btn-neutral mt-4" onClick={handleLoginClick}>Login</button>
        </fieldset>
    </div>
       
  )
}

export default Login