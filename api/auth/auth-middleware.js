const Users = require('../users/users-model')

/*
  If the user does not have a session saved in the server

  status 401
  {
    "message": "You shall not pass!"
  }
*/
function restricted() {

}

/*
  If the username in req.body already exists in the database

  status 422
  {
    "message": "Username taken"
  }
*/
async function checkUsernameFree(req, res, next) {
  try{

    let usernameToCheck = req.body.username
    const allUsers = await Users.find()

    console.log(allUsers)
    const foundUser = allUsers.filter(user => {
      return usernameToCheck === user.username
    })
    console.log(foundUser)
    if(foundUser.length === 0){
      next()
    } else {
      res.status(422).json({message: "Username taken"})
    }
  }catch(err){
    next(err)
  }
}

/*
  If the username in req.body does NOT exist in the database

  status 401
  {
    "message": "Invalid credentials"
  }
*/
function checkUsernameExists() {

}

/*
  If password is missing from req.body, or if it's 3 chars or shorter

  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
*/
function checkPasswordLength(req, res, next) {
  const passToCheck = req.body.password
  if(passToCheck.length < 4){
    res.status(422).json({message: "Password must be longer than 3 chars"})
  } else {
    next()
  }
}

// Don't forget to add these to the `exports` object so they can be required in other modules
module.exports = {
  restricted,
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength
}