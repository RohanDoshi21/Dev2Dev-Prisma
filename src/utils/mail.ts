import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.EMAIL_USER, // generated ethereal user
    pass: process.env.EMAIL_PASSWORD, // generated ethereal password
  },
});

const sendEmail = (to: string, subject: string, html: string) => {
  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    html: html,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const notifyOwner = (
  email: string,
  title: string,
  description: string,
  answer: string
) => {
  const subject = "Your question has been answered!";
  const html = `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Question Answered</title>
            <style>
            body {
                font-family: sans-serif;
                font-size: 16px;
                line-height: 1.5;
                color: #333;
                background-color;
            }

            h1 {
                font-size: 1.5rem;
                margin: 0;
            }

            p {
                margin-bottom: 16px;
            }

            a {
                color: #000088;
                text-decoration: none;
            }

            a:hover {
                text-decoration: underline;
            }

            header {
                background-color: #0066cc;
                color: #fff;
                padding: 1rem;
            }

            img {
                max-width: 100%;
                height: auto;
            }
            </style>
        </head>
        <body>
            <header>
            <h1>Your question has been answered!</h1>
            </header>
            <main>
            <section>
                <h2>Question</h2>
                <p>
                <strong>Title:</strong> ${title}
                </p>
                <p>
                <strong>Description:</strong> ${description}
                </p>
            </section>
            <section>
                <h2>Answer</h2>
                <p>
                <strong>Description:</strong> ${answer}
                </p>
            </section>
            </main>
        </body>
    </html>
	`;

  sendEmail(email, subject, html);
};

export default {
  notifyOwner,
};
