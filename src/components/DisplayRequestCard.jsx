import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { removeRequest } from "../store/slices/requestSlice"
import { useDispatch } from "react-redux"

const DisplayRequestCard = ({request}) => {
    const requestId = request._id
    const {firstName, lastName, imageUrl, gender, age, about } = request.fromUserId
    const dispatch = useDispatch()

    const handleRequest = async (status, id) => {
        // /request/review/:status/:requestId
        try{
            const res = await axios.post(BASE_URL + "/request/review/" + status+"/"+requestId, {}, {withCredentials : true})
            dispatch(removeRequest(id))
            console.log(res?.data?.request)
        }catch(err){
            console.error(err.response.satatus)
        }
    }
  return (
    <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
            <img
            alt="user image"
            src={imageUrl}
            className="max-w-sm rounded-lg shadow-2xl"
            />
            <div>
                <h1 className="text-5xl font-bold">{firstName+" " + lastName} </h1>
                <p className="py-6">
                    {gender+", "+age}
                </p>
                <p className="py-6">
                    {about}
                </p>
                {/* <div></div> */}
                <button className="btn btn-primary mx-4" onClick={() => {handleRequest("rejected", requestId)}}>Reject</button>
                <button className="btn btn-secondary" onClick={() => {handleRequest("accepted", requestId)}}>Accept</button>
            </div>
        </div>
    </div>
  )
}

export default DisplayRequestCard