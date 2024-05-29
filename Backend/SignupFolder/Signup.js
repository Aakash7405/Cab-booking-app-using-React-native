const user = require("../modal/userModel");
const twilio = require("twilio");

const accountSid = Your_twillio_accountSid;
const authToken = Your_twillio_authToken;
const twillioClient = new twilio(accountSid, authToken);
const signup = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const userEntry = await user.findOne({ phoneNumber });
    if (userEntry) {
      return res.status(400).json({ message: "Phone Number already exists" });
    }

    //generate otp
    const number = "0123456789";
    let otp = "";
    for (let i = 0; i < 4; i++) {
      otp += number[Math.floor(Math.random() * 10)];
    }

    //twilio part
    twillioClient.messages
      .create({
        body: `Your OTP for DriveEase is : ${otp} `,
        from: "+12177344825",
        to: `+91${phoneNumber}`,
      })
      .then(() => {
        res.json({ success: true, otp: otp});
      })
      .catch((error) => {
        res.status(500).json({ success: false, message: 'Phone verification Failed' });
      });
  } catch (err) {
    res.status(500).json("internal server error");
  }
};

const verify=async(req,res)=>{
  try{
    const {phoneNumber}=req.body;
    const userEntry = await user.findOne({ phoneNumber });
    if (userEntry) {
      return res.status(400).json({ success:false, message: "Phone Number already exists" });
    }

    const data = new user({ phoneNumber });
    await data.save();

    res.status(200).json({success:true})
  }catch(error)
  {
    res.status(500).json("internal server error");
  }
}
module.exports={signup,verify};
