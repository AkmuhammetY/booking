import { Request, Response } from "express";
import { Room } from "../entities/Room";

export const getAll = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page as string) || 0;
    const limit = 10;
    const offset = page * 10;

    const [rooms, total] = await Room.getAll(limit, offset);
    res.json(rooms).status(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const room = await Room.getById(id);
    res.json(room).status(200);
  } catch (error) {
    console.error();
    res.sendStatus(500);
  }
};

export const add = async (req: Request, res: Response) => {
  try {
    const values = new Room();

    await Room.add(values);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await Room.deleteById(id);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const values = req.body as Room;

    await Room.updateById(id, values);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
