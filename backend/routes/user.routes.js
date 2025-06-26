import express from 'express'
import  {protectedRoute}  from '../middleware/auth.middleware.js';
import { getUsers, registerUser, loginUser, updateUser, deleteUser } from '../controllers/user.controllers.js';
const router = express.Router()

// CRUD 
router.get('/', protectedRoute, getUsers);
// get all users
router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/:id', protectedRoute, updateUser);
router.delete('/:id', protectedRoute, deleteUser);


export default router;
