const transporter = require("../config/mail");
const sendMail = async ({ to, subject, text }) => {
  await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: `<h1>Welcome to ABC system</h1>`, // html body
  });
};
module.exports = sendMail;
