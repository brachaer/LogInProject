import users from "../data/users.js";
import IsPropertyValid from "../utilitis/isPropertyValid.js";

const getUsers=async (req,res)=>{
    return await res.send(users);
}

const addUser=async (req,res)=>{
    const { username, password, firstName } = req.body;
    const nameRegex = /^[A-Za-z]+$/;
    const usernameRegex = /^[A-Za-z0-9]+$/;
    console.log(IsPropertyValid(nameRegex,firstName,12));

    if(IsPropertyValid(nameRegex,firstName,12) && IsPropertyValid(usernameRegex,username,12)&& password.length<=12){
        if (await users.find((u) => u.username === username)) {
            return res.status(400).send( "Username already exists. Please choose a different one." );
            }
         
           const newUser = {
             id: users.length + 1,
             username,
             password, 
             firstName,
           };
         
           await users.push(newUser);
           return res.status(201).send(newUser);   
    }
    
  else{
    return res.status(406).send("Invalid username or password ");
  }
}

const loginUser=async (req,res)=>{
    const { username, password } = req.body;
    if(username.length <=12 || password.length <=24){
        const user = await users.find((u) => u.username === username && u.password === password);
        if (!user) {
          return res.status(404).send("Invalid username or password.");
        }
        if (user.password!== password) {
          return res.status(401).send("Invalid username or password.");
        }
        return res.status(200).send(user);
    }
      else{
        return res.status(406).send("Invalid length of username or password.");
      } 
}

export {getUsers, addUser, loginUser}