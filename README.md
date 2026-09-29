# DevTinder

- Create Vite + Reatc application
- Clean the code
- Install Tailwind CSS and configure vite.config.js
- Install Daisy UI and configure
- Add NabBar to APp.jsx
- Create seperate component for NavBAR
- Install react-router-dom
- Create BrowserRouter > Routes > Route
- Create an <outlet /> in Body Component
- Create a footer

- Create Login Page
- Install axios
- CORS - Install cord package in backend and use it as a middleware app.use(cors())
- Configure cors to whitelist your origin and credentials : true to get back token on Browser. app.use(cors({origin: "http://localhost:5173", credentials : true}))
- Add {withCredentials : true in axios.post(url, {}, {withCredentials : true})} These 2 steps above are crucial to get the token in the cookie

- Install react-redux and redux toolkit , set up store & userSlice
- add redux dev tools in chrome
- Login and check if data appears properly in the store
- Navbar should update with user's photo as soon as user logsin
- Redirect the page to Feed component as soon as the user logs in
- Refactor code to to create a constants file and keep the BASE URL there
- You should not access other routes without login - test
- If token not present, redirect to Login
- Build Logout Feature
- in Feed Component fetch Feed from API 
- Create a feedSlice and store fethed data to redux
- Build a UserCard component
- Build Profile component and use the same UserCard in profile along with the form
- Show a success toast after succesfully updating profile
- Build Connections Page - DisplayConnectionCard component to isolate rendering logic
- Build Pending Requests Page - DisplayRequestCard component to isolate rendering logic
- After reviewing and either on clicking accepted/rejected the card should disappear from Requests page, if accepted should appear on Connections Page 
- On Feed Page, complete interested and ignored features