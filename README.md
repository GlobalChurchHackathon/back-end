# GlobalChurchHackathon - Back End

## Model Schemas
* UserSchema
    email
    password
* ProfileSchema:
    firstName
    lastName
    location
    phoneNumber

## API Endpoints 
* localhost:4000 - Get Route ("Hello World")
* localhost:4000/users - Get Route (Get All Users)
* localhost:4000/users - Post Route (Add New User)

## How to Use
1. Clone to your local machine
2. Create .env in root directory with DB_CONNECTION = "mongodb+srv://YourUserName:YourPassword@ServerName"
3. Replace "YourUserName", "YourPassword", "ServerName with your MongoDB credentials in .env 
4. `npm install` in your terminal to install node-modules
5. `npm start` to open development in your browser
