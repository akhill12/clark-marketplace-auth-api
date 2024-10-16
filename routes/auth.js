import express from 'express';
import { login, register, registerAdmin, verifyToken } from '../controllers/auth.controller.js';


const router = express.Router();

router.post('/', register);

router.post('/login', login);

router.post('/adminRegistration', registerAdmin);

router.get('/verify/:token',verifyToken)

//PR check-final
//2nd pr


export default router;