import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
  In,
} from "typeorm";
import { Hotel } from "./Hotel";
import { Book } from "./Book";

@Entity()
export class Room extends BaseEntity {
  constructor(init?: Partial<Room>) {
    super();
    Object.assign(this, init);
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToMany(() => Book, (book) => book.room)
  bookings: Book[];

  @ManyToOne(() => Hotel, (hotel) => hotel.rooms)
  hotel: Hotel;

  static async getAll(limit: number, offset: number) {
    return await Room.find({
      take: limit,
      skip: offset,
      relations: ["hotel", "bookings"],
    });
  }

  static async getById(id: string) {
    return await Room.findOneBy({ id });
  }

  static async getByIds(ids: string[]) {
    const rooms = await Room.findBy({ id: In(ids) });
    return rooms;
  }

  static add(values: Partial<Room>) {
    return new Room(values).save();
  }

  static async updateById(id: string, values: Partial<Room>) {
    const result = await Room.createQueryBuilder()
      .update(Room)
      .set(values)
      .where("id = :id", { id })
      .execute();
    return result;
  }

  static deleteById(id: string) {
    return Room.delete(id);
  }
}
