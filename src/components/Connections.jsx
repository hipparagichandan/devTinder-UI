import axios from 'axios'
import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../store/slices/connectionsSlice'
import DisplayUserCard from './DisplayConnectionCard'
import { BASE_URL } from '../utils/constants'

const Connections = () => {
    const dispatch = useDispatch()
    const connections = useSelector(store => store.connections)

    useEffect(()=> {
        async function fetchConnections (){
            try{
                const res = await axios.get(BASE_URL + "/user/connections", {withCredentials :true})
                dispatch(addConnections(res.data))
            }catch(err){
                console.error("ERROR : " + err.response.data)
            }
            
        }

        fetchConnections()
    },[dispatch])

    if(!connections) {
        return ;
    }

    if(connections.length === 0){
        return <h1>No Conncections</h1>
    }

  return (
    <div>
        {connections.map(connection => (
            <DisplayUserCard user={connection} key={connection._id} />
        ))}
    </div>
  )
}

export default Connections