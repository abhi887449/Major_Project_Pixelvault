import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique:true,
  },
  Name: {
    type: String,
    default: 'User',
  },
  Email: {
    type: String,
    default: '',
  },
  ProfileImage: {
    type: String,
    default: '',
  },
  Username: {
    type: String,
    default: '',
  },
  SocialLinks: {
    type: Object,
    default: {},
  },
});
mongoose.models = {};
export default mongoose.model("UserSchema", UserSchema);
