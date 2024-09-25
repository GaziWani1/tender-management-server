import { Router } from "express";
import {  verifyJWT } from "../middleware/auth.middleware.js";
import { createTender, listTender } from "../controller/tender.controller.js";
const router = Router()


router.post('/create-tender', verifyJWT ,createTender)
router.get('/list-tender', verifyJWT , listTender)

export default router