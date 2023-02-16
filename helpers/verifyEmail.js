const Mailjet = require('node-mailjet');

const { MAILJET_PUBLIC, MAILJET_PRIVATE, MAILJET_FROM, PORT } = process.env;

const mailjet = new Mailjet({
    apiKey: MAILJET_PUBLIC,
    apiSecret: MAILJET_PRIVATE,
});

async function sendEmail({ to, subject, body }) {
    try {
        const request = await mailjet
            .post('send', { version: 'v3.1' })
            .request({
                Messages: [
                    {
                        From: {
                            Email: MAILJET_FROM,
                            Name: 'Instagrom',
                        },
                        To: [
                            {
                                Email: to,
                            },
                        ],
                        Subject: subject,
                        TextPart: body,
                        HTMLPart: `
                    <html>
                        <body>
                            <div style="text-align: center;">
                                <h1>${subject}</h1>
                                <p>${body}</p>
                            </div>
                        </body>
                    </html>
                    `,
                    },
                ],
            });
    } catch (error) {
        console.log('error', error);
        throw new Error('Hubo un problema al enviar el email.');
    }
}

async function verifyEmail(email, registrationCode) {
    const emailBody = `
        <h2>Bienvenido a Instagrom</h2>
        <p>Haz click en el siguiente enlace para verificar y activar tu cuenta :D</p>
        <p>
            <a href="http://localhost:${PORT}/validate/${registrationCode}">
                http://localhost:${PORT}/validate/${registrationCode}
            </a>
        </p>
    `;

    await sendEmail({
        to: email,
        subject: 'Activa tu cuenta',
        body: emailBody,
    });
}

module.exports = verifyEmail;
