import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'

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