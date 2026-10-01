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


# Deployment

- signup on AWS console
- Launch an EC2 instance - .pem key downloaded
- GitBash here
- chmod 400 "devTinder-secret.pem"
- ssh -i "devTinder-secret.pem" ubuntu@ec2-13-61-143-165.eu-north-1.compute.amazonaws.com 
- Install Node version v24.14.1
- Git clone both devTinder and devTinder-ui projects

- FrontEnd Project
    - Npm install on EC2 machine
    - npm run build
    - sudo apt update
    - sudo apt install nginx
    - sudo systemctl start nginx
    - sudo systemctl enable nginx
    - copy code  from dist (build files) folder to /var/www/html
    - sudo scp -r dist/* /var/www/html/
    - Enable port :80 on your instance
        - AWS -> Security ->security group -> Inbound rules -> edit -> Add a rule -> port range :80 --- 0000.0

    ----- DONE ---

    - If redeploying the code after making changes, this command will be handy to delete existing files at /var/www/html. Instead of deleting and copying manually, use rsync with the --delete flag. This tool is built specifically for this job. It compares the two folders, copies the new files, and automatically deletes any files in /var/www/html that are no longer present in dist.
        - sudo rsync -av --delete dist/ /var/www/html/

- Backend Project
    - cd devTinder
    - npm install
    - allowed ec2 instance public IP on mongoDB server
    - npm start (but we will use pm2 to start this application)
    - npm install pm2 -g //this is to keep your server running 24/7 pm2 manages it// PM  : process Manager
    - pm2 start npm -- start // default app name will be npm. To give custom name, check the below command
    - pm2 start npm --name "devTinder-backend" -- start
    - pm2 logs
    - pm2 list, pm2 flush <name> ,pm2 stop <name> (pm2 stop devTinder-backend), pm2 delete <name>
    - config nginx - /etc/nginx/sites-available/default
    - restart nginx - sudo systemctl restart nginx
    - modify the BASE_URL = "/api" in front end project


- Connecting FE & BE
    - Frontend = http://13.61.143.165/
    - Backend  = http://13.61.143.165:7777

    - Domain name = devTinder.com => 13.61.143.165

    - Frontend = devTinder.com
    - Backend  = devTinder.com:7777 ==> devTinder.com/api  (we don't want it like :7777. Instead we want it to be like devTinder.com/api should be running Backend)
    - To do this, we need to proxy pass /api/ to :7777 using nginx proxy pass on EC2 machine

    # nginx config:
        - sudo nano /etc/nginx/sites-available/default

        - server_name 23.61.143.165 

            server {
                listen 80;
                server_name your_domain_or_ip; # Change this to your domain or server IP

                # Handles API requests and strips the "/api" prefix
                location /api/ {
                    proxy_pass http://127.0.0; # Note the trailing slash here
                    
                    # Core Proxy Configuration
                    proxy_set_header Host $host;
                    proxy_set_header X-Real-IP $remote_addr;
                    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                    proxy_set_header X-Forwarded-Proto $scheme;

                    # WebSocket & Persistent Connection Support
                    proxy_http_version 1.1;
                    proxy_set_header Upgrade $http_upgrade;
                    proxy_set_header Connection 'upgrade';
                    proxy_cache_bypass $http_upgrade;

                }
            }
        - sudo systemctl restart nginx

# Adding a custom DOmain Name
    - purchased domain name from godaddy
    - signup on cloudfare & add a new domain name
    - change the nameservers on Godaddy and point it to cloudfare
    - DNS record: A devTinder.in 13.61.143.165
    - Enable SSL for website

# Sending Email Via SES
    - Create a IAM user
    - Give access to AmazonSESFullAccess
    - Amazon SES: Create an Identity
    - Verify your domain name
    - verify an email address identity
    - Install AWS SDK - v3
    - code Example https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/ses#code-examples
    - Setup SESClient
    - Access Credentials should be created in IAM under SecurityCredentials Tab
    - Add the credentials to the env file
    - Write code for SESClient
    - Write code for sending email address
    - Make the email dyncamic by passing more params to the run function
