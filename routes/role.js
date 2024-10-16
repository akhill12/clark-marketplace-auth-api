import express from 'express';
import { createRole, deleteRole, getAllRoles, updateRole } from '../controllers/role.controller.js';

const router = express.Router();


//Take the web api standard rules
// No addition routes for CRUD operation
// http method => POST => by default create a new rol
// http method => PUT with ID => by default update the role

//create a new role in DB
router.post('/', createRole);

//Update role in DB
router.put('/:id', updateRole);

router.get('/', getAllRoles);

router.delete('/:id',deleteRole);

export default router;

