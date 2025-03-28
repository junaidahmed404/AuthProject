import { sendPasswordResetEmail, sendResetSuccessEmail, sendVarificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";
import { recipient, sender, transporter } from "../mailtrap/mailtrap.config.js";
import { User } from "../models/user.model.js"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"
import bcrypt from "bcryptjs";
import crypto from 'crypto'; // Import the crypto module

export const signup = async (req, res) => {

    // res.send('Signup route')

    const { email, password, name } = req.body;

    try {

        if (!email || !password || !name) {

            throw new Error("Please fill in all fields");

        }

        const userAlreadyExist = await User.findOne({ email })

        if (userAlreadyExist) {

            return res.status(400).json({ success: false, message: "User ALready Exist" })

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const varificationToken = Math.floor(100000 + Math.random() * 900000)

        const user = new User({

            email,

            password: hashedPassword,

            name,

            varificationToken,

            varificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 Hours

        });

        await user.save();

        // JWT 

        generateTokenAndSetCookie(res, user._id)

        await sendVarificationEmail(user.email, varificationToken)

        return res.status(201).json({

            success: true, message: "User created successfully",

            user: {

                ...user._doc,

                password: undefined,

            }

        })

    } catch (error) {

        return res.status(400).json({ success: false, message: error.message })

    }

}



// _________________________________________________________________________________




export const varifyEmail = async (req, res) => {

    const { code } = req.body;

    try {

        const user = await User.findOne({

            varificationToken: code,

            varificationTokenExpiresAt: { $gt: Date.now() }

        });

        if (!user) {

            return res.status(400).json({ success: false, message: "Invalid or Expired varification token" });

        }

        user.isVarified = true;

        user.varificationToken = undefined;

        user.varificationTokenExpiresAt = undefined;

        await user.save();

        await sendWelcomeEmail(user.name, user.email);

        return res.status(200).json({ success: true, message: "Email varified successfully" });


    } catch (error) {

        console.log("Error Sending Welcome Email", error);

        return res.status(500).json({ success: false, message: error.message })



    }



}


// _________________________________________________________________________________


export const login = async (req, res) => {

    // res.send('Login route')

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }
        // Generate JWT token
        generateTokenAndSetCookie(res, user._id)

        user.lastLogin = new Date()
        user.save()
        return res.status(200).json({ success: true, message: "Logged in successfully" })
    } catch (error) {
        console.log("Error Logging in", error)
        return res.status(500).json({ success: false, message: error.message })
    }

}


// _________________________________________________________________________________




export const logout = async (req, res) => {

    // res.send('Logout route')

    res.clearCookie('token')

    res.status(200).json({ success: true, message: 'Logged Out Succesfully' })



}



// _________________________________________________________________________________


export const forgotPassword = async (req, res) => {

    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        // Generate reset token using crypto
        const resetToken = crypto.randomBytes(20).toString('hex');

        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

        // Update user document with reset token and expiration time
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();

        // Send email with reset token to the user's email
        await sendPasswordResetEmail(user.email, `https://localhost:5173/reset-password?/${resetToken}`);

        res.status(200).json({ success: true, message: "Password reset email sent to your email" });

    } catch (error) {
        console.log("Error in forgot password", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};



// _________________________________________________________________________________


export const resetPassword = async (req, res) => {


    try {
        const { token } = req.params;
        const { password } = req.body;
        // Check if the reset token is valid and not expired
        const user = await User.findOne({
            resetPasswordToken: token, resetPasswordExpiresAt:
                { $gt: Date.now() }
        });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
        }
        // Hash the new password and update the user document
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();
        await sendResetSuccessEmail(user.email)
        res.status(200).json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        console.log("Error in reset password", error);
        return res.status(500).json({ success: false, message: error.message });

    }

}



// _________________________________________________________________________________


export const checkAuth = async (req, res) => {

    try {

        const user = await User.findById(req.userId).select("-password");

        if (!user) {

            return res.status(404).json({ success: false, message: "User not found" });

        }

        res.status(200).json({ success: true, message: "User authenticated successfully" });

    } catch (error) {

        console.log("Error in check auth", error);

        return res.status(500).json({ success: false, message: error.message });

    }

}