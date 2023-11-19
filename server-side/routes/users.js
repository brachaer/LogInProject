import express  from "express";
import {getUsers, addUser, loginUser} from '../controllers/users.js';
const router= express.Router();

router.get('/', getUsers);

router.post('/add', addUser);

router.post('/login', loginUser);

export default router;