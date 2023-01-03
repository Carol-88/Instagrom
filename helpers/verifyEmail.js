const sgMail = require('@sendgrid/mail');
require('dotenv').config();


const { SENDGRID_API_KEY, SENDGRID_FROM, PORT } = process.env;


sgMail.setApiKey(SENDGRID_API_KEY);


async function sendMail({ to, subject, body }) {
    try {
       
        const msg = {
            to,
            from: SENDGRID_FROM,
            subject,
            text: body,
            html: `
                <html>
                    <body>
                        <div style="text-align: center;">
                            <h1>${subject}</h1>
                            <p>${body}</p>
                        </div>
                    </body>
                </html>
            `,
        };

        
        await sgMail.send(msg);
    } catch (error) {
        throw new Error('Hubo un problema al enviar el email.');
    }
}


async function verifyEmail(email, registrationCode) {
   
    const emailBody = `
        <h2>Bienvenido a Mini-Wallapop</h2>
        <p>Haz click en el siguiente enlace para verificar y activar tu cuenta :D</p>
        <p>
            <a href="http://localhost:${PORT}/validate/${registrationCode}">
                http://localhost:${PORT}/validate/${registrationCode}
            </a>
        </p>
    `;


    await sendMail({
        to: email,
        subject: 'Activa tu cuenta',
        body: emailBody,
    });
}

module.exports = verifyEmail;