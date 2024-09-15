import express from 'express'
import { login, getUserProfile, signUp } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()


router.route('/signup').post(signUp)
router.post('/login', login)
router.route('/profile').get(protect, getUserProfile)

export default router