# GlobalChurchHackathon - Back End

## Model Schemas
* UserSchema
  + email
  + password
* ProfileSchema:
  + firstName
  + lastName
  + location
  + phoneNumber
* RequestSchema:
  + title
  + description
  + isClaimed (Boolean)
* ChurchSchema:
  + name
  + email
  + website
  + address1
  + address2
  + city
  + state
  + zipCode
  + social media (2 fields)

## API Endpoints 
* localhost:4000 - Get Route ("Hello World")
* localhost:4000/users - Get Route (Get All Users)
* localhost:4000/users/:userId - Get Route (Get Single User)
* localhost:4000/users - Post Route (Add New User)
* localhost:4000/requests - Get Route (Get All Requests)
* localhost:4000/requests - Post Route (Add New Request)

## How to Use
1. Clone to your local machine
2. Create .env in root directory with DB_CONNECTION = "mongodb+srv://YourUserName:YourPassword@ServerName"
3. Replace "YourUserName", "YourPassword", "ServerName with your MongoDB credentials in .env 
4. `npm install` in your terminal to install node-modules
5. `npm start` to open development in your browser
