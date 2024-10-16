import nodemailer from 'nodemailer';

export const sendVerficationEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'marketplace-clark@outlook.com', // Replace with your Outlook/Live.com email address
          pass: 'clark@1434',          // Replace with your Outlook/Live.com password
        },
        tls: {
          ciphers: 'SSLv3',
        },
      });
      

    const mailOptions = {
      from: '"Clark Marketplace email verification" <clarkplayfield@hotmail.com>',
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

export const sendMatchEmail = async (subject, text, bcc) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false,
        auth: {
            user: 'clarkplayfield@hotmail.com', // Replace with your Outlook/Live.com email address
            pass: 'clark@1434',          // Replace with your Outlook/Live.com password
          },
          tls: {
            ciphers: 'SSLv3',
          },
      });
    
      // Send mail with BCC to all recipients
      const info = await transporter.sendMail({
        from: '"Match Notification" <clarkplayfield@hotmail.com>',
        bcc,
        subject,
        text,
      });
    
      console.log('Email sent: ', info);
  };
