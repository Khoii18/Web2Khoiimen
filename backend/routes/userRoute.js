import express from 'express'
import { allUser, getUser, login, registerUser } from '../controller/userController.js'
import authUser from '../middlewares/userAuth.js'
const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', login)
userRouter.get('/get-user', authUser, getUser)
userRouter.get('/all-user', allUser)

export default userRouter