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
  console.log(req.body)
  try{
    const { username, password} = req.body;
    // const userQuery = `SELECT * FROM login WHERE username = ${username}`
    // const user = await db.query(userQuery)
    const pwQuery = `select password from login Where username= '${username}'`
    const pw = await db.query(pwQuery)
   
    //compare the password with its hashed version
    console.log(pw.rows[0].password)
    bcrypt.compare(`${password}`,`${pw.rows[0].password}`, function(err,result){
      if(err){
        return next({log: 'Error in bcrypt loginUser'})
      }
      else if(result ==true){
        console.log('pw is right')
        res.locals.loginMsg = 'Successful login'
        console.log(res.locals.loginMsg)
      }
      else if(result == false){
        console.log('pw is wrong')
        // this works but i can't put the below mesg to the loginMsg even though its possible above
        // res.local.loginMsg = `Incorrent Username and/or Password`
      }
    })
    return next()
  }
  catch{
    return next({log : 'Error in loginUser Middleware' })
  }
}

module.exports = userController;
