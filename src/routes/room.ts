import { Request, Router } from "express";
import { getAll, getOne, add, update, remove } from "../controller/room";

const router = Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", add);
router.put("/:id", update);
router.delete("/:id", remove);

export { router as roomsRouter };
