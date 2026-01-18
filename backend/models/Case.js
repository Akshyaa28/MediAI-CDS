import mongoose from "mongoose";

const CaseSchema = new mongoose.Schema(
  {
    patientId: String,
    age: Number,
    gender: String,

    symptoms: {
      type: [String],
      required: true
    },

    history: {
      type: [String],
      default: []
    },

    pastMedical: {
      type: [String],
      default: []
    },

    medications: {
      type: [String],
      default: []
    },

    allergies: {
      type: [String],
      default: []
    },

    labs: {
      type: [String],
      required: true
    },

    vitals: {
      bp: String,
      hr: String,
      temp: String,
      rr: String,
      spo2: String
    },

    analysis: {
      type: Object,
      default: {}
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Case", CaseSchema);
