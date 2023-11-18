
export default async ({email, otp}) => {

console.log(otp,'I wo=ill generate html this is the otp')
  const html = `
    <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Template</title>
        </head>
        
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
        
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
            <tr>
                    <td style="padding: 20px 0; text-align: center; background-color: #f4f4f4;">
                    <img src="https://picsum.photos/150" alt="Your Logo" width="150">
                    </td>
                </tr>
                <tr>
                <td style="padding: 20px; text-align: center;">
                <h2 style="color: #333;">Hello, ${email}</h2>
                        <p style="font-size: 16px; color: #666;">Thank you for using our service.</p>
                        <p style="font-size: 16px; color: #666;">Your OTP is:</p>
                        <h1 style="color: #0066cc;">${otp}</h1>
                    </td>
                </tr>
                <tr>
                <td style="text-align: center;">
                <img src="https://picsum.photos/300" alt="Image 1" width="300" style="margin-bottom: 20px;">
                </td>
                </tr>
                <tr>
                    <td style="padding: 20px; text-align: center; background-color: #f4f4f4;">
                        <p style="font-size: 14px; color: #666;">If you did not request this OTP or need assistance, please contact our support team at support@example.com.</p>
                    </td>
                </tr>
            </table>

        </body>

        </html>
        
    
        `;
        return html
};
