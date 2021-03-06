noo-authentication-boilerplate 🤝
=======================

Simple authentication boilerplate for Node.js

This boilerplate only covers the rules for authentication. Very common tools are used in the market, such as those highlighted below.
It is open for adding other rules and data schemas.
Have a good time.

If you have any question about email sending to forgot-password see docs nodemailer.

Features
--------
- RESTfull 
- **Authentication JWT** using Email and Password
- MVC Project Structure
 - Register
 - Login   
 - Forgot Password
 - Reset Password
- CSRF protection

Prerequisites
-------------

- RUN => [MongoDB](https://www.mongodb.com/download-center/community)****
- [Node.js 8.0+](http://nodejs.org)

Getting Started
---------------

The easiest way to get started is to clone the repository:

```bash
# Get the latest snapshot
git clone https://github.com/icaromotta/noo-authentication-boilerplateh.git myproject

# Change directory
cd myproject

# Install NPM dependencies
npm install

# Then simply start your app
node app.js
```