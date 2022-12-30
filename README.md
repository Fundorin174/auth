# User Authentication

### The application is a fullstack application with a full-fledged process of registration and user authorization on the portal

### Application functionality:
- New user registration
- Authorization of a registered user (login)
- Automatic login of a previously registered user (refresh token is stored for 30 days)
- Frontend and backend validation (empty field, max/min length, confirm password, email)
- Automatic access token update by refresh token
- Auth guard
- Activation of a new user by mail (the service is implemented, but not activated, currently new users are activated automatically)

### Technology stack:
- Docker compose

#### Frontend:
- React
- Typescript
- Redux Toolkit
- SCSS modules

#### Backend:
- Node JS
- Express
- bctypt
- cookie-parser
- nodemailer
- pg

#### Database:
- postgresql
- pgAdmin

### Installation:
- download the project
- go to the root directory of the project
- docker-compose build
- docker-compose up -d
- go to http:\\\localhost:3000

For clarity, several users have already been initiated in the database.
If you do not want to create your own, you can login as a test user: email: test@test.test, password: test

![Login Form](https://github.com/Fundorin174/auth/raw/main/tools/login.jpg)

![Signup form](https://github.com/Fundorin174/auth/raw/main/tools/signup.jpg)