import express from 'express'
import { userDetails } from '../controllers/adminController.js'

const router = express.Router()

router.get("/:userId",userDetails)

export default router;