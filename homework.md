ES-3 | Creating our Express Server

- create a repository
- Intialize the repository
- node_modules, package.json, package-lock.json
- Install Express
- Create a server
- Listen to port 7777
- Write request handler for /test, /hello
- Install nodemon and update scripts inside package.json
- What are dependencies?
- What is the use of "-g" while npm install
  => -g means install globally in your machine means it can be used for any other app in your system
- Differences between caret and tilde (^ vs ~) : Ex = 5.3.0 (5 - Major, 3 - Minor, 0 - Patch)
  => ^ Auto upadte for any minor and patch changes happended
  => ~ Auto Update only patch changes happended

ES-4 | Routing & Request Handlers

- Initialize git
- .gitignore
- Create a remote repo on github
- Push all code to remote origin
- Play with routes and route extension ex. /hello. /, /hello/2, /xyz
- Order of the routes matter a lot
- Install postman app and make a workspace/collection > test API call
- Write logic to handle GET, POST, PUT, PATCH, DELETE API calls and test them on Postman
- Explore routing and use of ?, \*, (), + in the routes
- Use of regex in routes /a/, /.\*fly$/
- Reading the query params in the routes
- Reading the dynamic routes

ES-5 | Middlewares & Error Handlers

- Multiple route handlers - play with code
- next()
- next function and errors along with res.send()
- app.use("/route", rH, [rH2, rH3, rH4], rH5);
- What is middleware? why do we need it?
- How express basically handles the requests behind the scenes
- Difference app.use and app.all
- Write a dummy auth middleware for admin
- Write a dummy auth middleware for all user routes, except /user/login
- Error handling useing app.use("/", (err, req, res, next) => {})

ES-6 | Database, Schema & Models | Mongoose

- Create a free cluster on MongoDB official website (Mongo Atlas)
- Install mongoose library
- Conect your application to the Database "Connection-url/"devTinder
- Call the connectDB function and connect to database before starting application on 7777
- Create a userSchema and user Model
- Create POST /signup API to add data to database
- Push some documents using API calls from postman
- Error handling using try, catch

ES-7 | Diving into the APIs

- JS Object vs JSON (difference)
- Add the express.json middleware to your app
- Make your signup API dynamic to recieve data fron end users
- User.findOne with duplicate email ids, which object is returned
- API - GET user by email
- API - Feed API - GET/feed - get all the users from the database
- API - Get user by ID
- Create a delete user API
- Difference between PATCH and PUT
- API - Update a user
- Explore the Mongoose Documentation for Model methods
- What are options in a Model.findOneAndUpdate method , explore more about it
- API - Update the user with email ID

ES-8 | Data Sanitization and Schema Validation

- Explore schematype option from the documentation
- Add required, unique, lowercase, min, minLength, trim
- Add default
- Create a custom validate function for gender
- Improve the DB schema - PUT all appropiate validations on each field in Schema
- Add timestamps to the userSchema
- Add API level validation on PATCH request and signup POST API
- DATA Sanitization - ADD API validation fot each field
- Install validator
- Explore validator library function and use the validator functions for password, email, photoUrl
- NEVER TRUST req.body

ES-9 | Encryping Passwords

- Validate data in Signup API
- Install bcrypt package
- Create PasswordHash using bcrypt.hash and save the user is encrypted password
- Create Login API
- Compare passwords and throw errors if email or password is invalid

ES-10 | Authentication JWT & Cookies

- install cookie-parser
- just send a dummy cookie to user
- create GET /profile APi and check if you get the cookie back
- install jsonwebtoken
- IN login API, after email and password validation, create e JWT token and send it to user in cookies
- read the cookies inside your profile API and find the logged in user
- userAuth Middleware
- Add the userAuth middle ware in profile API and a new sendConnectionRequest API
- Set the expiry of JWT token and cookies to 7 days
- Create userSchema method to getJWT()
- Create UserSchema method to comparepassword(passwordInputByUser)
