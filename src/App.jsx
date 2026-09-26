import { BrowserRouter, Route, Routes } from "react-router"
import Body from "./components/Body.jsx"
import Login from "./components/Login.jsx"
import Profile from "./components/Profile.jsx"
import Feed from "./components/Feed.jsx"

function App() {

  return (
    <>
      <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}> 
          <Route path="/" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

/* 
  App
    - Body
      -NavBar
      -Outlet -- {"/" feed, "/profile" Profile , "/connections" Conections}
      - Footer


*/
