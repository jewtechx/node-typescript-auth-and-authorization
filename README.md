# node-typescript-authentication

### Features
1. Register a user
2. Verify user's email address
3. Send forgot password email
4. Reset password
5. Get current user
6. Login
7. Access token
8. Refresh tokens


### Technologies used
 
 * Typescript - Static type checking
 * Express - Web server
 * Typegoose - Mongoose wrapper for creating Typescript inferfaces and models 
 * argon2 - Password hashing
 * Zod - Validation
 * jsonwebtokens - Signing and verifying JSON web tokens
 * Nodemailer - Sending mails
 * Pino - Logging
 * config - Managing configuration

 ### API URL

\`\`\`bash
https://node-ts-auth.onrender.com
\`\`\`


 ### Endpoints
  1. `/api/users` - Creates a new user
  2. `/api/users/verify/:id/:verificationCode` - Verifies and new user
  3. `/api/users/forgotpassword` - Sends a forgot password mail
  4. `/api/users/resetpassword` - Resets password
  5. `/api/users/me` - Gets current user
  6. `/api/sessions` - Creates sessions
  7. `/api/sessions/refresh` - Refreshes Tokens

  ### Project by
  Jew Larbi Danquah - Dite , Inc