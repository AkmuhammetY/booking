import { Request, Response } from "express";
import { Hotel } from "../entities/Hotel";
import { Room } from "../entities/Room";

export const getAll = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 0;
    const limit = 10;
    const offset = page * 10;

    const [hotels, total] = await Hotel.getAll(limit, offset);

    res.json(hotels).status(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const hotel = await Hotel.getById(id);
    res.json(hotel);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const add = async (req: Request, res: Response) => {
  try {
    const values = req.body as Hotel;

    await Hotel.add(values);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const addRoom = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { roomIds } = req.body;

    const hotel = await Hotel.getById(id);
    const rooms = await Room.getByIds(roomIds);
    if (!rooms || !hotel || rooms.length === 0) return res.sendStatus(404);

    for (const room of rooms) {
      room.hotel = hotel;
      await room.save();
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Hotel.deleteById(id);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const values = req.body as Hotel;

    await Hotel.updateById(id, values);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
