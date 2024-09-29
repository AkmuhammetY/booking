import { Request, Response } from "express";
import { Book } from "../entities/Book";
import { Hotel } from "../entities/Hotel";

export const getAll = async (req: Request, res: Response) => {
  try {
    const bookings = await Book.getAll();
    if (!bookings) return res.sendStatus(404);

    res.json(bookings).status(200);
  } catch (error) {
    console.error(error);

    res.sendStatus(500);
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.sendStatus(404);

    const booking = await Book.getById(id);
    res.json(booking).status(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const getByUsername = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    const bookings = await Book.getByUsername(username);

    res.json(bookings).status(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const add = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const values = req.body as Book;

    const booking = await Book.add(id, values);
    if (!booking) return res.sendStatus(403);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const values = req.body as Book;

    const booking = await Book.updateById(id, values);
    if (!booking) return res.sendStatus(403);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await Book.deleteById(id);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
