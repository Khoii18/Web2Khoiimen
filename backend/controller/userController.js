import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/usermodel.js'
import jwt from 'jsonwebtoken'
import cloudinary from 'cloudinary'
// api to register
export const registerUser = async (req, res) => {
    try {
        const { username, email, phone, password_1, password_2, dob } = req.body


        if (!username || !email || !phone || !password_1 || !password_2 || !dob) {
            return res.json({ success: false, message: 'Hãy Điền Đầy Đủ Thông Tin' })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Hãy Điền Email Hợp Lệ" })
        }

        const isUser = await userModel.findOne({ email })

        if (isUser) {
            return res.json({ success: false, message: 'Email này đã tồn tại' })
        }

        const isPhone = await userModel.findOne({ phone })
        if (isPhone) {
            return res.json({ success: false, message: 'Số điện thoại này đã tồn tại' })
        }

        if (phone.length !== 10) {
            return res.json({ success: false, message: 'Hãy Điền Số Điện Thoại Hợp Lệ ' })
        }

        if (password_1.length < 8) {
            return res.json({ success: false, message: 'Mật Khẩu Không Đủ Mạnh' })
        }

        if (password_1 !== password_2) {
            return res.json({ success: false, message: 'Mật Khẩu Không Giống Nhau' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password_1, salt)

        const userData = {
            username,
            email,
            phone,
            password: hashedPassword,
            dob
        }

        const newUser = new userModel(userData)
        await newUser.save()

        res.json({ success: true })

    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.json({ success: fasle, message: 'missing email or password' })
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: 'email not found' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.json({ success: false, message: 'wrong password' })
        }

        const accesstoken = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET)

        return res.json({ success: true, message: 'login success', accesstoken })
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: 'Some thing wrong' })
    }
}

export const getUser = async (req, res) => {
    try{
        const {userId} = req.body

        const user = await userModel.findById(userId)
        res.json({success: true, user})
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }
}
export const allUser = async (req, res) => {
    try{
        const allUser = await userModel.find()

        res.json({success: true, allUser})
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }
}
export const updateProfile = async (req, res) => {
    try{
        const {userId, username, phone, dob} = req.body
        const image = req.file
        console.log(userId)
        const user = await userModel.findById(userId)

        if(!user) {
            return res.json({success: false, message: 'user not found'})
        }

        if(username) {
            await userModel.findByIdAndUpdate(userId, {username})
        }

        if(phone) {
            await userModel.findByIdAndUpdate(userId, {phone})
        }
        
        if(dob) {
            await userModel.findByIdAndUpdate(userId, {dob})
        }

        if (image) {
            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(image.path, { resource_type: 'image' })
            const imageUrl = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, { image: imageUrl })
        }
        res.json({ success: true, messgae: 'profile updated' })
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }
}
export const deleteUser = async (req, res) => {
    try{
        const {userId} = req.body

        await userModel.findByIdAndDelete(userId)

        res.json({success: true,message: 'user has been deleted'})
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message })
    }
}