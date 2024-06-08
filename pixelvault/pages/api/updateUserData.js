import UserModel from "../../models/UserModel";
import connectDatabase from "../../middleware/mongoose";
import isEmail from "validator/lib/isEmail";
import { isBase64, isEthereumAddress, isJSON, isLength } from "validator";

const handler = async (req, res) => {
  try {
    if (req.method == "POST") {
      if (!isEthereumAddress(req.body.address)) {
        res.status(400).json({ error: "Please enter valid ethereum address" });
        return;
      }
      const isUserExist = await UserModel.findOne({
        address: req.body.address,
      });
      let user
      if (isUserExist) {
        if (!isLength(req.body.Name, { min: 2, max: undefined })) {
          res
            .status(400)
            .json({ error: "Please enter atleast 3 characters in name" });
          return;
        }
        if (!isEmail(req.body.Email)) {
          res.status(400).json({ error: "Please enter valid email!" });
          return;
        }
        if (!isLength(req.body.Username, { min: 2, max: undefined })) {
          res
            .status(400)
            .json({ error: "Please enter atleast 3 characters in username" });
          return;
        }
        if (!isJSON(JSON.stringify(req.body.SocialLinks))) {
          res
            .status(400)
            .json({ error: "Please enter social links in valid format" });
          return;
        }
         user = await UserModel.findByIdAndUpdate(
          isUserExist._id,
          {
            Name: req.body.Name,
            Email: req.body.Email,
            ProfileImage: req.body.ProfileImage,
            Username: req.body.Username,
            SocialLinks: req.body.SocialLinks,
          },
          {
            new: true,
          }
        );
      } else {
         user = new UserModel({
          address: req.body.address,
          Name: req.body.Name,
          Email: req.body.Email,
          ProfileImage: req.body.ProfileImage,
          Username: req.body.Username,
          SocialLinks: req.body.SocialLinks,
        });
        await user.save();
      }
      res.status(200).json({ success: user });
    } else {
      res.status(400).json({ error: "This method is not allowed" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export default connectDatabase(handler);
