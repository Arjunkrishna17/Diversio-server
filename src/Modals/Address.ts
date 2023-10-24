import { Schema, model } from "mongoose";

const addressSchema = new Schema({
  userId: { type: String, required: true },
  fullName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  pincode: { type: String, required: true },
  address1: { type: String, required: true },
  address2: { type: String, required: true },
  landmark: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  default: { type: Boolean, require: true },
});

const AddressModal = model("Address", addressSchema);

export default AddressModal;
