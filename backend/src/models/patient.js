import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  gender: String,
  phoneNo: String,
  address: String,
  medicalHistory: String,
  patientId: {
    type: String,
    unique: true,
  },
  bloodGroup: String,
  allergies: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Patient", patientSchema);
