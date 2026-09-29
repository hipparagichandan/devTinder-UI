import { useEffect } from "react"
import axios from "axios"
import { useDispatch,useSelector } from "react-redux"
import { BASE_URL } from "../utils/constants"
import { addFeed } from "../store/slices/feedSLice"
import UserCard from "./UserCard"


const Feed = () => {
  const dispatch = useDispatch()
  const feedData = useSelector(store => store.feed)
  

  useEffect (() => {
    const getFeed = async () => {
      try{
        const res = await axios.get(BASE_URL + "/user/feed", {withCredentials : true})
        dispatch(addFeed(res.data))
      }catch(err){
        console.alert(err?.response?.data)
      }
    }

    if(!feedData){
      getFeed()
    }
  }, [dispatch, feedData])

  if(!feedData) return;
  
  if(feedData?.length === 0) return <h1>No Users Found in Feed</h1>

  return ( feedData && 
    <div className="flex justify-center my-10">
      <UserCard user={feedData[0]} />
    </div>
  )
}

export default Feed