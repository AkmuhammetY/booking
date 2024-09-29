import { Router } from "express";
import { hotelsRouter } from "./hotel";
import { bookingRouter } from "./book";
import { roomsRouter } from "./room";

const router = Router();

router.use("/hotel", hotelsRouter);
router.use("/booking", bookingRouter);
router.use("/rooms", roomsRouter);

export default router;
