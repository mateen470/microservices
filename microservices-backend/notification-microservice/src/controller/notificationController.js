const transporter = require("../config/mailConfig");

exports.sendLoginNotification = async (req, res) => {
  const { email, name } = req.body;

  console.log("in e-mail", req.body);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "SUCCESSFULL LOGIN!!",
    text: `GUTEN TAG! ${name} YOU HAVE SUCCESSFULLY LOGGED-IN!!`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "LOGIN E-MAIL SENT SUCCESSFULLY!!" });
  } catch (error) {
    console.error("ERROR SENDING E-MAIL!!", error);
    res.status(500).json({ error: "FAIL TO SEND E-MAIL!!" });
  }
};
