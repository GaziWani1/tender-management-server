import Bid from '../model/bid.model.js';
import Tender from '../model/tender.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { sendEmail } from '../utils/emailprovider.js';

export const placebid = async (req, res) => {
  try {
    const { tenderId, companyName, bidCost } = req.body;

    const tender = await Tender.findById(tenderId);
    if (!tender) return res.status(404).json({ msg: 'Tender not found' });

    // Calculate the remaining time
    const timeRemaining = tender.endTime - Date.now();

    // Initialize the flag
    let flag = false;

    // If the bid is placed within the last 5 minutes, set the flag
    if (timeRemaining <= 5 * 60 * 1000) {
      flag = true;

      // Extend tender end time by buffer time if a bid is placed in the last 5 minutes
      tender.endTime = new Date(
        tender.endTime.getTime() + tender.bufferTime * 60 * 1000
      );
      const subject = `Bid Placed in Last 5 Minutes for Tender: ${tender?.tenderName}`;
      const text = `<p>A bid has been placed by ${companyName} within the last 5 minutes for the tender "${tender.tenderName}". Please check the tender details</p>`;

      sendEmail('gaziwani123@gmail.com',subject,text)

      await tender.save();
    }

    // Create a new bid
    const bid = new Bid({
      tenderId,
      companyName,
      bidCost,
      flag,
      user: req.params.userId,
    });

    // Save the bid to the database
    await bid.save();

    return res
      .status(201)
      .json(new ApiResponse(200, bid, 'Bid Placed Successfully'));
  } catch (error) {
    console.log('ERROR WHILE PLACING BID :: ', error.message);
    return res.status(500).json({ error : true , message: 'internal server error' });
  }
};

export const userlistBid = async (req, res) => {
  try {
    const bids = await Bid.find({
      user: req.params.userId,
    }).sort({ bidCost: 1 });
    return res.status(201).json(new ApiResponse(200, bids, 'Bid List'));
  } catch (error) {
    console.log('ERROR WHILE PLACING BID :: ', error.message);
    return res.status(500).json({ message: 'internal server error' });
  }
};

export const lowestBid = async (req, res) => {
  try {
    const lowestBid = await Bid.find({ tenderId: req.params.tenderId })
      .sort({ bidCost: 1 }) 
      .limit(1);
    if (!lowestBid)
      return res.status(404).json({ msg: 'No bids found for this tender' });

    return res.status(201).json(new ApiResponse(200, lowestBid, 'lowest'));
  } catch (error) {
    console.log('ERROR WHILE PLACING BID :: ', error.message);
    return res.status(500).json({ error : true , message: 'internal server error' });
  }
};
