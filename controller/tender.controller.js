import Tender from '../model/tender.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const createTender = async (req, res) => {
  try {
    const { tenderName, description, startTime, endTime, bufferTime } =
      req.body;
    if (!tenderName || !description || !description || !startTime)
      return res.status(400).json({ message: 'all fields are required' });
    const tender = new Tender({
      tenderName,
      description,
      startTime,
      endTime,
      bufferTime,
    });
    await tender.save();
    return res
      .status(201)
      .json(new ApiResponse(200, tender, 'Tender Created Successfully'));
  } catch (error) {
    console.log('ERROR WHILE CREATING RENDER :: ', error);
    return res.status(500).json({ error : true , message: error.message});
  }
};

export const listTender = async (_, res) => {
  try {
    const tenders = await Tender.find();
    return res.status(201).json(new ApiResponse(200, tenders));
  } catch (error) {
    console.log('ERROR WHILE GET RENDER :: ', error.message);
    return res.status(500).json({ message: 'internal server error' });
  }
};
