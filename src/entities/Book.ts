import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";

import { Hotel } from "./Hotel";
import { Room } from "./Room";

@Entity()
export class Book extends BaseEntity {
  constructor(init?: Partial<Book>) {
    super();
    Object.assign(this, init);
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ type: "date", array: true })
  bookingDate: string[];

  @ManyToOne(() => Room, (room) => room)
  room: Room;

  static async getAll() {
    return await Book.find({ relations: ["room"] });
  }

  static async getById(id: string) {
    return await Book.findOne({ where: { id }, relations: ["room"] });
  }

  static async getByUsername(username: string) {
    return await Book.findOne({ where: { username }, relations: ["room"] });
  }

  static async add(roomId: string, values: Partial<Book>) {
    const room = await Room.getById(roomId);
    const { bookingDate } = values;
    if (!room || !bookingDate) return null;

    const isAvailable = await Book.isRoomAvailable(
      roomId,
      bookingDate[0],
      bookingDate[1]
    );
    if (!isAvailable) return null;

    values.room = room;
    return new Book(values).save();
  }

  static deleteById(id: string) {
    return Book.delete(id);
  }

  static async updateById(id: string, values: Partial<Book>) {
    const booking = await Book.getById(id);
    if (!booking) return null;

    if (!values.bookingDate) {
      const result = await Book.createQueryBuilder()
        .update(Book)
        .set(values)
        .where("id = :id", { id })
        .execute();
      return result;
    }

    const newDates = values.bookingDate;
    const isAvailable = await Book.isRoomAvailable(
      booking.room.id,
      newDates[0],
      newDates[1]
    );
    if (!isAvailable) return null;

    return await Book.update({ id }, values);
  }

  static async isRoomAvailable(
    roomId: string,
    startingDate: string,
    endingDate: string
  ) {
    const bookings = await Book.createQueryBuilder("book")
      .where("book.roomId = :roomId", { roomId })
      .getMany();
    if (!bookings || bookings.length === 0) return true;

    let isAvailable = true;
    const startDate = new Date(startingDate).getTime();
    const endDate = new Date(endingDate).getTime();

    bookings.forEach((book) => {
      const bookingStart = new Date(book.bookingDate[0]).getTime();
      const bookingEnd = new Date(book.bookingDate[1]).getTime();
      const isOverlapping =
        (startDate >= bookingStart && startDate <= bookingEnd) ||
        (endDate >= bookingStart && endDate <= bookingEnd) ||
        (startDate <= bookingStart && endDate >= bookingEnd);

      if (isOverlapping) {
        isAvailable = false;
      }
    });
    return isAvailable;
  }
}
