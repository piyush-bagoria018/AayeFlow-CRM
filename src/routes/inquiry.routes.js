import { Router } from "express";
import {
  createInquiry,
  getInquiries,
  deleteInquiry,
} from "../controllers/inquiry.controller.js";

const router = Router();

// Routes only connect a URL to a controller. No logic here.
router.route("/").post(createInquiry).get(getInquiries);

router.route("/:id").delete(deleteInquiry);

export default router;
