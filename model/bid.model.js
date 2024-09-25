import mongoose from "mongoose";

const BidSchema = new mongoose.Schema({
  tenderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tender', required: true },
  companyName: { type: String, required: true },
  bidCost: { type: Number, required: true },
  bidTime: { type: Date, default: Date.now },
  flag: { type: Boolean, default: false },
  user:{type : mongoose.Schema.Types.ObjectId , ref :'User' , required : true}
});

export default mongoose.model('Bid', BidSchema);
