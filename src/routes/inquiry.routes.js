import { Router } from "express";
import {
  createInquiry,
  getInquiries,
  deleteInquiry,
} from "../controllers/inquiry.controller.js";

const router = Router();

router.route("/").post(createInquiry).get(getInquiries);

router.route("/:id").delete(deleteInquiry);

export default router;
