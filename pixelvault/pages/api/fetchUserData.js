import UserModel from "../../models/UserModel";
import connectDatabase from "../../middleware/mongoose";
import { isEthereumAddress } from "validator";

const handler = async (req, res) => {
  try {
    if(req.method == "POST"){
      if (!isEthereumAddress(req.body.address)) {
        res.status(400).json({ error: "Please enter valid Ethereum Address!" });
        return;
      }
      let user = await UserModel.findOne({ address: req.body.address });
      res.status(200).json({ user: user });
    }
    else{
      res.status(400).json({ error: "Method not allowed" });
      return
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export default connectDatabase(handler);
