import { Router } from "express";
import {
  getAll,
  getOne,
  add,
  remove,
  update,
  getByUsername,
} from "../controller/book";

const router = Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.get("/username", getByUsername);
router.post("/:id", add);
router.delete("/:id", remove);
router.put("/:id", update);

export { router as bookingRouter };
