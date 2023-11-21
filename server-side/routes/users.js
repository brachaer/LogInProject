import express  from "express";
import {getUsers, addUser, loginUser} from '../controllers/users.js';
import cookieJwtAuth from '../middleware/cookieJwtAuth.js';

const router= express.Router();

router.get('/', cookieJwtAuth, getUsers);
router.post('/', addUser);
router.post('/login', loginUser);

export default router;