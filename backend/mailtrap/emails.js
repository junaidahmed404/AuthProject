
import { sender, transporter} from "./mailtrap.config.js"

import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./emailTemplates.js"



// _________________________________________________________________________________




export const sendVarificationEmail = async (email, varificationToken) => {

    // const recipient = [{ email }]

    try {

        const response = await transporter.sendMail({

            from: sender,

            to: email,

            subject: 'Verify your email',

            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", varificationToken),

            category: "Email Varification"

        })

        console.log("Email Sent Successfully", response)

    } catch (error) {

        console.log("Error Sending Email", error)
        throw new Error(`Error Sending email, ${error}`);

    }

}



// _________________________________________________________________________________



export const sendWelcomeEmail = async (name, email) => {

    try {

        const response = await transporter.sendMail({

            from: sender,

            to: email,

            subject: "Welcome To Our Company",

            html: WELCOME_EMAIL_TEMPLATE.replace("{userName}", name)

        })

    } catch (error) {

    }

}



// _________________________________________________________________________________


export const sendPasswordResetEmail = async (email, resetUrl) => {
    try {
        // Ensure resetUrl is correctly formatted
        console.log("Generated Reset URL:", resetUrl);

        const htmlContent = PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl);

        const response = await transporter.sendMail({
            from: sender,  // Ensure 'sender' is correctly defined
            to: email,  // Pass recipient dynamically
            subject: "Password Reset",
            html: htmlContent,
        });

        console.log("Password Reset Email Sent Successfully", response);
    } catch (error) {
        console.error("Error Sending Password Reset Email", error);
        throw new Error("Error Sending Password Reset Email");
    }
};




// _________________________________________________________________________________


export const sendResetSuccessEmail = async (email, req, res) => {

    try {

        // const { email } = req.body;
        // const { token } = req.params;
        // const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`
        const response = await transporter.sendMail({
            from: sender,
            to: email,
            subject: "Password Reset Successfull",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset"
        });
        console.log("Password Reset Success Email Sent Successfully", response);
    } catch (error) {
        console.error("Error Sending Password Reset Success Email", error);
        throw new Error("Error Sending Password Reset Success Email", error);
    }
};
// _________________________________________________________________________________