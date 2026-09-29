import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../store/slices/feedSLice";
import { BASE_URL } from "../utils/constants";

const UserCard = ({user}) => {
    const {firstName, lastName, age, gender, about, imageUrl} = user;
    const dispatch = useDispatch()

    const handleSendRequest = async (status,userId) =>{
        try{
            const res = await axios.post(BASE_URL+"/request/send/"+status+"/"+userId, {}, {withCredentials : true})
            dispatch(removeUserFromFeed(userId))
        }catch(err){
            console.error("ERROR : " + err.response.data)
        }
    }

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
            <img
            src={imageUrl}
            alt="userImage" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{firstName + " " + lastName}</h2>
            <p>{`${gender}, ${age}`}</p>
            <p>{about}</p>
            <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={()=>{handleSendRequest("ignored", user._id)}} >Ignore</button>
                <button className="btn btn-secondary" onClick={()=>{handleSendRequest("interested", user._id)}} >Show Interest</button>
            </div>
        </div>
    </div>
  )
}

export default UserCard