import nodemailer from "nodemailer";
import generateHtml from '@utils/generateHtml';
const SMTP_PASSWORD = "texz ktwa glux gfun";

export default async (form:{email:string, otp:number}) => {
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

    // transporter.verify((error, result) =>{
    //   if (error) {
    //     console.log(error, ' is error in verification')}
    //     console.log(result, ' is the result')
    // })

    await new Promise((resolve, reject) => {
      // verify connection configuration
      transporter.verify(function (error, success) {
          if (error) {
              console.log(error);
              reject(error);
          } else {
              console.log("Server is ready to take our messages");
              resolve(success);
          }
      });
  });

    const emailBody = await generateHtml(form)
    // console.log(emailBody, 'email body generated');
    const message = {
      from: "tosuhailpm@gmail.com",
      to: email,
      subject: "OTP for verification",
      html: emailBody,
    };

    // transporter.sendMail(message,(error, info)=> {
    //     if (error) {console.log(error, ' error in sending mail with ', message);return};
    //         console.log(info)
    // })

    await new Promise((resolve, reject) => {
      // send mail
      transporter.sendMail(message, (err, info) => {
          if (err) {
              console.error(err);
              reject(err);
          } else {
              console.log('email sent successfully');
              resolve(info);
          }
      });
  });


  } catch (error) {
    console.log(error, ' in sendEmail try catch')
  }
};
