import users from "../data/users.js";
import jwt from "jsonwebtoken";
import IsPropertyValid from "../utilitis/isPropertyValid.js";

const getUsers= (req,res)=>{
  if (req.user) {
    return res.send(users);
  }
  else {
    return  res.status(400).send("ERROR");
  }
}

const addUser= (req,res)=>{
    const { username, password, firstName } = req.body;
    const nameRegex = /^[A-Za-z]+$/;
    const usernameRegex = /^[A-Za-z0-9]+$/;

    if(IsPropertyValid(nameRegex,firstName,12) && IsPropertyValid(usernameRegex,username,12)&& password.length<=24){
        if (users.find((u) => u.username === username)) {
            return  res.status(400).send( "Username already exists. Please choose a different one." );
            }
         
           const newUser = {
             id: users.length + 1,
             username,
             password, 
             firstName,
           };
         
            users.push(newUser);
           return  res.status(201).send(newUser);   
    }
  else{
    return  res.status(406).send("Invalid username or password ");
  }
}

const loginUser= (req,res)=>{
  const {username, password} = req.body;
  const user = users.find((p) => p.username === username);
  if(!user){
      res.status(404).send("not found");
  }
  if(user.password !== password){
      res.status(400).send("Invalid Credentials");    
  }
  const {MY_JWT_SECRET}= process.env;
  delete user.password;
  const token=jwt.sign(user,MY_JWT_SECRET, {expiresIn: "1m"});
  res.cookie("token",token,{httpOnly: true});
  return res.send();
 
}

export {getUsers, addUser, loginUser}