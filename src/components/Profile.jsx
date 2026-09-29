import {useState} from 'react'
import UserCard from './UserCard'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { addUser } from '../store/slices/userSlice'

const Profile = () => {
  const dispatch = useDispatch()
  const userData = useSelector(store => store.user)
  // const {firstName, lastName, age, gender, about, imageUrl} = userData;

  const [firstName,setFirstName] = useState(userData?.firstName || "")
  const [lastName, setLastname] = useState(userData?.lastName || "")
  const [age, setAge] = useState(userData?.age || 30)
  const [gender, setGender] = useState(userData?.gender || "")
  const [about, setAbout] = useState(userData?.about)
  const [imageUrl, setImageUrl] = useState(userData?.imageUrl)

  const [error,setError] = useState("")
  const [isShowToast,setShowToast] = useState(false)

  const handleProfileUpdate = () => {
    async function updateProfile(){
      try{
        setError("")
          const res = await axios.patch(BASE_URL+"/profile/edit" , {
          firstName, lastName, age, gender, about, imageUrl
        }, {withCredentials : true})
        console.log(res?.data?.data)
        dispatch(addUser(res?.data?.data))
        setShowToast(true)
        setTimeout(()=> {
          setShowToast(false)
        }, 2000)
        
      }catch(err){
        setError(err?.response?.data)
      }
    }

    updateProfile()
  }
  

  return ( userData && 
    <div className='flex justify-center my-20'>
      { isShowToast && <div className="toast toast-center toast-top">
       <div className="alert alert-success">
          <span>Profile Updated successfully.</span>
        </div>
      </div>}
      <div>
        <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4 mx-5">
          <legend className="fieldset-legend">Edit Profile</legend>

          <label className="label">firstName</label>
          <input type="text" className="input" placeholder="firstName"  value={ firstName} onChange={e => setFirstName(e.target.value)} />

          <label className="label">lasName</label>
          <input type="text" className="input" placeholder="firstName"  value={ lastName} onChange={e => setLastname(e.target.value)}/>

          <label className="label">Age</label>
          <input type="text" className="input" placeholder="Enter age"  value={ age} onChange={e => setAge(e.target.value)} />

          <label className="label">Gender</label>
          <input type="text" className="input" placeholder="Enter gender"  value={ gender} onChange={e => setGender(e.target.value)} />

          <label className="label">About</label>
          <input type="text" className="input" placeholder="Enter about"  value={ about} onChange={e => setAbout(e.target.value)} />

          <label className="label">Image url</label>
          <input type="text" className="input" placeholder="Enter Image url"  value={ imageUrl} onChange={e => setImageUrl(e.target.value)} />

          <p className='text-red-500'>{error}</p>

          <button className="btn btn-neutral mt-4" onClick={handleProfileUpdate}>Save Profile</button>
        </fieldset>
      </div>
      <UserCard user={{firstName, lastName, age, gender, about, imageUrl}} />
    </div>
  )
}

export default Profile