import nodemailer from "nodemailer";
import generateHtml from '@utils/generateHtml';
const SMTP_PASSWORD = "texz ktwa glux gfun";

export default async (form) => {
  const { email } = form;
  // console.log(email,' is form with good otp')

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: 'tosuhailpm@gmail.com',
        pass: SMTP_PASSWORD,
      },
    });
    console.log(transporter, ' is the transporter created');

    transporter.verify((error, result) =>{
      if (error) {
        console.log(error, ' is error in verification')}
        console.log(result, ' is the result')
    })

    const emailBody = await generateHtml(form)
    // console.log(emailBody, 'email body generated');
    const message = {
      from: "tosuhailpm@gmail.com",
      to: email,
      subject: "OTP for verification",
      html: emailBody,
    };

    transporter.sendMail(message,(error, info)=> {
        if (error) {console.log(error, ' error in sending mail with ', message);return};
            console.log(info)
    })
  } catch (error) {
    console.log(error, ' in sendEmail try catch')
  }
};
