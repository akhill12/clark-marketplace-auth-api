import express from 'express';

import { getAllUsers, getUserById } from '../controllers/user.controller.js';
import { validateToken } from '../utils/validateToken.js';

const router = express.Router();

router.get('/',validateToken, getAllUsers);

router.get('/:id',validateToken, getUserById)


export default router;