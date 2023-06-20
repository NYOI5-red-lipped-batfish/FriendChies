const db = require('./dbModel');
const bcrypt = require ( 'bcrypt' )

const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    
    //Add pw hashing here
    const salt = await bcrypt.genSalt()
    const hashedPw = await bcrypt.hash(password, salt)

    const createUserSQL = `INSERT INTO login (username, password)
    VALUES ($1, $2)`;

    const response = await db.query(createUserSQL, [username, hashedPw]);

    res.locals.user = response;
    return next();
  } catch (err) {
    return next(err);
  }
};

userController.loginUser = async (req, res, next) =>{
  try{
    const { username, password} = req.body;
    const userQuery = `SELECT * FROM login WHERE username = ${username}`
    const user = await db.query(userQuery)

    //compare the password with its hashed version
    if(bcrypt.compare(password,user.password)){
      res.locals.loginMsg = 'Successful login'
    }else { res.local.loginMsg = 'Incorrent Username and/or Password'}
    return next()
  }
  catch (err){
    return next(err)
  }
}

module.exports = userController;
