const Request = require("../model/schema");

exports.createRequest = async (req, res) => {
  try {
    const { title, description, type, urgency, superiorEmail, email, name } =
      req.body;

    let requestorEmail = email;
    let requestorName = name;

    const newRequest = new Request({
      title,
      description,
      type,
      urgency,
      superiorEmail,
      requestorEmail,
      requestorName,
    });

    await newRequest.save();
    res.status(201).send();
  } catch (error) {
    res.status(500).json({ message: "FAILED TO SAVE REQUEST IN DB!!" });
  }
};
