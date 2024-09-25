import mongoose from "mongoose";

const TenderSchema = new mongoose.Schema({
  tenderName: { type: String, required: true },
  description: { type: String },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  bufferTime: { type: Number, required: true }, 
},{
  timestamps : true
});

export default mongoose.model('Tender', TenderSchema);
