import nodemailer from 'nodemailer';

import dotenv from 'dotenv';

dotenv.config();

export const transporter = nodemailer.createTransport({

  host: 'smtp.gmail.com',

  port: 587,

  secure: false,

  auth: {

    user: process.env.GMAIL_USER,

    pass: process.env.GMAIL_PASS

  },

});

export const sender = {

  name: "Junaid Ahmed",

  address: process.env.GMAIL_USER,

};

