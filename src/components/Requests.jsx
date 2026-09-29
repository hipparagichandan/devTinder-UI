import axios from 'axios'
import {BASE_URL} from "../utils/constants"
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests } from '../store/slices/requestSlice'
import DisplayRequestCard from './DisplayRequestCard'

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector(store => store.requests)

  useEffect(()=> {
      const getPendingRequests = async () => {
      try{
        const res = await axios.get( BASE_URL + "/user/requests/received" , {withCredentials : true})
        dispatch(addRequests(res?.data?.data))
       
      }catch(err){
        console.error("ERROR : "+ err.response.data)
      }
    }
    getPendingRequests()
  }, [dispatch])

  if(!requests) return ;
  if(requests.length === 0) return <h1>No Requests Pending</h1>

  return (
    <div>
      {requests.map(request => (
        <DisplayRequestCard key={request._id} request = {request} />
      ))}
    </div>
  )
}

export default Requests