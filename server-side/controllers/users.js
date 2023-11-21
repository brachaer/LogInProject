import users from "../data/users.js";
import jwt from "jsonwebtoken";
import IsPropertyValid from "../utilitis/isPropertyValid.js";

const getUsers=async (req,res)=>{
  if (req.user) {
    return await res.send(users);
  }
  else {
    return await res.status(400).send("ERROR");
  }
}

const addUser=async (req,res)=>{
    const { username, password, firstName } = req.body;
    const nameRegex = /^[A-Za-z]+$/;
    const usernameRegex = /^[A-Za-z0-9]+$/;

    if(IsPropertyValid(nameRegex,firstName,12) && IsPropertyValid(usernameRegex,username,12)&& password.length<=24){
        if (users.find((u) => u.username === username)) {
            return await res.status(400).send( "Username already exists. Please choose a different one." );
            }
         
           const newUser = {
             id: users.length + 1,
             username,
             password, 
             firstName,
           };
         
            users.push(newUser);
           return await res.status(201).send(newUser);   
    }
  else{
    return await res.status(406).send("Invalid username or password ");
  }
}

const loginUser= async(req,res)=>{
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username && u.password === password);
        if (!user) {
          return await res.status(404).send("Not found");
        }
        if (user.password!== password) {
          return await res.status(400).send("Invalid username or password.");
        }
        const {MY_JWT_SECRET}= process.env;
        delete user.password;
        const token=jwt.sign(user,MY_JWT_SECRET, {expiresIn: "5m"});
        res.cookie("token",token,{httpOnly: true});
        return await res.status(200).send(user);
}

export {getUsers, addUser, loginUser}