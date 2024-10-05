import express from 'express';
import { 
    login, 
    logout, 
    signup,  
    forgotPassword, 
    resetPassword, 
    checkAuth,
    deleteUser,
    updateUser,
    getUsers,
    updateUserRole,
    changePassword,
    register,
    downloadUsers
} from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/check-auth', checkAuth);

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password/:token', resetPassword);

router.delete('/delete/:id', deleteUser);

router.put('/update/:id', updateUser);

router.get('/users', getUsers);

router.put('/update-role', updateUserRole);
router.put('/change-password/:id', changePassword);

router.post('/register', register);
router.get('/download-users', downloadUsers);

export default router;