import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {  lowestBid, placebid, userlistBid } from "../controller/bid.controller.js";

const router = Router()


router.post('/placebid/:userId', verifyJWT ,placebid)
router.get('/user-list-bid/:userId', verifyJWT , userlistBid)
router.get('/lowestbid/:tenderId', verifyJWT , lowestBid)


export default router