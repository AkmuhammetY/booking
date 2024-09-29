import { Router } from "express";
import {
  getAll,
  getOne,
  add,
  addRoom,
  remove,
  update,
} from "../controller/hotel";

const router = Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", add);
router.post("/room/:id", addRoom);
router.put("/:id", update);
router.delete("/:id", remove);

export { router as hotelsRouter };
