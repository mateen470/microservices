const jwt = require("jsonwebtoken");
const client = require("../config/googleAuthClient");

exports.googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;

    const jwtToken = jwt.sign(
      { userId: sub, email, name, picture },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token: jwtToken, message: "LOGIN SUCCESSFULL!!" });
  } catch (error) {
    res.status(401).send(error.message || error);
  }
};
