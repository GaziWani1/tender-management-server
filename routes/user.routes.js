import {Router} from 'express'
import { login, logout, registerUser } from '../controller/user.controller.js'

const router = Router()

router.route('/register-user').post(registerUser)
router.route('/login').post(login)
router.route('/logout').get(logout)

export default router