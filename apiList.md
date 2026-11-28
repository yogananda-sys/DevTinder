# DevTinder APIs

## authRouter

- POST /auth/signup
- POST /auth/login
- POST /auth/logout
- POST /auth/otp/send
- POST /auth/otp/verify
- POST /auth/forgot-password
- POST /auth/reset-password

## profileRouter

- GET /profile/view
- PATCH /Profile/edit
- PATCH /profile/password // Forgot password API

## connectionRequestRouter

- POST /request/send/:status/:userId 
- POST /request/review/:status/:requestId

- POST /likes/:userId
- POST /requests/:requestId/accept
- POST /requests/:requestId/ignore
- POST /requests/:requestId/reject

## userRouter

- GET /user/requests/received
- GET /user/connections
- GET /user/feed - Gets you the profiles of other users on platform

# Status

["ignored", "interested", "accepeted", "rejected"];
